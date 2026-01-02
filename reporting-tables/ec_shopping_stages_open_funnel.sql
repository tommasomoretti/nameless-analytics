CREATE OR REPLACE TABLE FUNCTION `tom-moretti.nameless_analytics.ec_shopping_stages_open_funnel`(start_date DATE, end_date DATE) AS (
  with base_events as (
    select
      user_date,
      client_id,
      user_id,
      session_id,
      session_channel_grouping,
      session_tld_source,
      session_campaign,
      session_device_type,
      session_country,
      session_language,
      event_date,
      event_name
    from `tom-moretti.nameless_analytics.events`(start_date, end_date, 'session')
  ),

  session_logic as (
    select
      user_date, client_id, user_id, session_id, session_channel_grouping, session_tld_source, session_campaign, session_device_type, session_country, session_language, event_date,
      logical_or(true) as has_session,
      logical_or(event_name = 'view_item') as has_view_item,
      logical_or(event_name = 'add_to_cart') as has_add_to_cart,
      logical_or(event_name = 'begin_checkout') as has_begin_checkout,
      logical_or(event_name = 'add_shipping_info') as has_add_shipping_info,
      logical_or(event_name = 'add_payment_info') as has_add_payment_info,
      logical_or(event_name = 'purchase') as has_purchase
    from base_events
    group by all
  ),

  funnel_logic as (
    select
      user_date, client_id, user_id, session_id, session_channel_grouping, session_tld_source, session_campaign, session_device_type, session_country, session_language, event_date,
      
      # OPEN FUNNEL STEPS (0 to 6)
      struct(client_id as cid, user_id as uid, session_id as sid, "All" as status) as s0,
      struct(if(has_view_item, client_id, null) as cid, if(has_view_item, user_id, null) as uid, if(has_view_item, session_id, null) as sid, if(has_view_item, 'New funnel entries', null) as status) as s1,
      struct(if(has_add_to_cart, client_id, null) as cid, if(has_add_to_cart, user_id, null) as uid, if(has_add_to_cart, session_id, null) as sid, if(has_add_to_cart, if(has_view_item, 'Continuing funnel entries', 'New funnel entries'), null) as status) as s2,
      struct(if(has_begin_checkout, client_id, null) as cid, if(has_begin_checkout, user_id, null) as uid, if(has_begin_checkout, session_id, null) as sid, if(has_begin_checkout, if(has_add_to_cart, 'Continuing funnel entries', 'New funnel entries'), null) as status) as s3,
      struct(if(has_add_shipping_info, client_id, null) as cid, if(has_add_shipping_info, user_id, null) as uid, if(has_add_shipping_info, session_id, null) as sid, if(has_add_shipping_info, if(has_begin_checkout, 'Continuing funnel entries', 'New funnel entries'), null) as status) as s4,
      struct(if(has_add_payment_info, client_id, null) as cid, if(has_add_payment_info, user_id, null) as uid, if(has_add_payment_info, session_id, null) as sid, if(has_add_payment_info, if(has_add_shipping_info, 'Continuing funnel entries', 'New funnel entries'), null) as status) as s5,
      struct(if(has_purchase, client_id, null) as cid, if(has_purchase, user_id, null) as uid, if(has_purchase, session_id, null) as sid, if(has_purchase, if(has_add_payment_info, 'Continuing funnel entries', 'New funnel entries'), null) as status) as s6
    from session_logic
  ),

  steps_pivot as (
    select 
      *
    from funnel_logic
    unpivot((step_client_id, step_user_id, step_session_id, status) for (step_name, step_index) in (
      (s0.cid, s0.uid, s0.sid, s0.status, "0 - All", 0),
      (s1.cid, s1.uid, s1.sid, s1.status, "1 - View item", 1),
      (s2.cid, s2.uid, s2.sid, s2.status, "2 - Add to cart", 2),
      (s3.cid, s3.uid, s3.sid, s3.status, "3 - Begin checkout", 3),
      (s4.cid, s4.uid, s4.sid, s4.status, "4 - Add shipping info", 4),
      (s5.cid, s5.uid, s5.sid, s5.status, "5 - Add payment info", 5),
      (s6.cid, s6.uid, s6.sid, s6.status, "6 - Purchase", 6)
    ))
  ),

  steps_prep as (
    select
      event_date,
      client_id,
      user_id,
      session_id,
      session_channel_grouping,
      split(session_tld_source, '.')[safe_offset(0)] as session_source,
      session_tld_source,
      session_campaign,
      session_device_type,
      session_country,
      session_language,
      step_name,
      step_index,
      case when step_name = '6 - Purchase' then null else step_index + 1 end as step_index_next_step_real,
      lead(step_index, 1) over (partition by session_id order by step_index) as step_index_next_step,
      status,
      lead(step_client_id, 1) over (partition by session_id order by step_index) as client_id_next_step_raw,
      lead(step_session_id, 1) over (partition by session_id order by step_index) as session_id_next_step_raw
    from steps_pivot
  )

  select 
    event_date,
    client_id,
    user_id,
    session_id,
    session_channel_grouping,
    session_source,
    session_tld_source,
    session_campaign,
    session_device_type,
    session_country,
    session_language,
    step_name,
    step_index,
    step_index_next_step_real,
    step_index_next_step,
    status,
    case when step_index_next_step_real = step_index_next_step then client_id_next_step_raw end as client_id_next_step,
    case when step_index_next_step_real = step_index_next_step then session_id_next_step_raw end as session_id_next_step
  from steps_prep
  group by all
);