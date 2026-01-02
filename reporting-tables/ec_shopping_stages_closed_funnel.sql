CREATE OR REPLACE TABLE FUNCTION `tom-moretti.nameless_analytics.ec_shopping_stages_closed_funnel`(start_date DATE, end_date DATE) AS (
  with base_events as (
    select
      user_date,
      client_id,
      user_id,
      user_channel_grouping,
      user_source,
      user_tld_source,
      user_campaign,
      user_device_type,
      user_country,
      user_language,
      user_type,
      new_user,
      returning_user,
      session_date,
      session_number,
      session_id,
      session_start_timestamp,
      session_end_timestamp,
      session_duration_sec,
      session_channel_grouping,
      session_source,
      session_tld_source,
      session_campaign,
      cross_domain_session,  
      session_landing_page_category,
      session_landing_page_location,
      session_landing_page_title,
      session_exit_page_category,
      session_exit_page_location,
      session_exit_page_title,
      session_hostname,
      session_device_type,
      session_country,
      session_language,
      session_browser_name,
      event_date,
      event_name
    from `tom-moretti.nameless_analytics.events`(start_date, end_date, 'session')
  ),

  session_logic as (
    select
      user_date, client_id, user_id, user_channel_grouping, user_source, user_tld_source, user_campaign, user_device_type, user_country, user_language, user_type, new_user, returning_user,
      session_date, session_number, session_id, session_start_timestamp, session_end_timestamp, session_duration_sec, session_channel_grouping,
      split(session_tld_source, '.')[safe_offset(0)] as session_source_split,
      session_tld_source, session_campaign, cross_domain_session, session_landing_page_category, session_landing_page_location, session_landing_page_title, session_exit_page_category, session_exit_page_location, session_exit_page_title, session_hostname, session_device_type, session_country, session_language, session_browser_name,
      event_date,
      logical_or(true) as has_session,
      logical_or(event_name = 'view_item') as has_view_item,
      logical_or(event_name = 'add_to_cart') as has_add_to_cart,
      logical_or(event_name = 'view_cart') as has_view_cart,
      logical_or(event_name = 'begin_checkout') as has_begin_checkout,
      logical_or(event_name = 'add_shipping_info') as has_add_shipping_info,
      logical_or(event_name = 'add_payment_info') as has_add_payment_info,
      logical_or(event_name = 'purchase') as has_purchase
    from base_events
    group by all
  ),

  funnel_logic as (
    select
      # USER & SESSION DATA (Keeping all 35 cols)
      user_date, client_id, user_id, user_channel_grouping, user_source, user_tld_source, user_campaign, user_device_type, user_country, user_language, user_type, new_user, returning_user,
      session_date, session_number, session_id, session_start_timestamp, session_end_timestamp, session_duration_sec, session_channel_grouping, session_source_split as session_source, session_tld_source, session_campaign, cross_domain_session, session_landing_page_category, session_landing_page_location, session_landing_page_title, session_exit_page_category, session_exit_page_location, session_exit_page_title, session_hostname, session_device_type, session_country, session_language, session_browser_name,
      event_date,
      
      # CLOSED FUNNEL LOGIC (Each step depends on the previous one)
      client_id as s0_client, user_id as s0_user, session_id as s0_session,
      if(has_view_item, client_id, null) as s1_client, if(has_view_item, user_id, null) as s1_user, if(has_view_item, session_id, null) as s1_session,
      if(has_view_item and has_add_to_cart, client_id, null) as s2_client, if(has_view_item and has_add_to_cart, user_id, null) as s2_user, if(has_view_item and has_add_to_cart, session_id, null) as s2_session,
      if(has_view_item and has_add_to_cart and has_begin_checkout, client_id, null) as s3_client, if(has_view_item and has_add_to_cart and has_begin_checkout, user_id, null) as s3_user, if(has_view_item and has_add_to_cart and has_begin_checkout, session_id, null) as s3_session,
      if(has_view_item and has_add_to_cart and has_begin_checkout and has_add_shipping_info, client_id, null) as s4_client, if(has_view_item and has_add_to_cart and has_begin_checkout and has_add_shipping_info, user_id, null) as s4_user, if(has_view_item and has_add_to_cart and has_begin_checkout and has_add_shipping_info, session_id, null) as s4_session,
      if(has_view_item and has_add_to_cart and has_begin_checkout and has_add_shipping_info and has_add_payment_info, client_id, null) as s5_client, if(has_view_item and has_add_to_cart and has_begin_checkout and has_add_shipping_info and has_add_payment_info, user_id, null) as s5_user, if(has_view_item and has_add_to_cart and has_begin_checkout and has_add_shipping_info and has_add_payment_info, session_id, null) as s5_session,
      if(has_view_item and has_add_to_cart and has_begin_checkout and has_add_shipping_info and has_add_payment_info and has_purchase, client_id, null) as s6_client, if(has_view_item and has_add_to_cart and has_begin_checkout and has_add_shipping_info and has_add_payment_info and has_purchase, user_id, null) as s6_user, if(has_view_item and has_add_to_cart and has_begin_checkout and has_add_shipping_info and has_add_payment_info and has_purchase, session_id, null) as s6_session
    from session_logic
  ),

  steps_pivot as (
    select 
      *
    from funnel_logic
    unpivot((step_client_id, step_user_id, step_session_id) for step_name in (
      (s0_client, s0_user, s0_session) as "0 - All",
      (s1_client, s1_user, s1_session) as "1 - View item",
      (s2_client, s2_user, s2_session) as "2 - Add to cart",
      (s3_client, s3_user, s3_session) as "3 - Begin checkout",
      (s4_client, s4_user, s4_session) as "4 - Add shipping info",
      (s5_client, s5_user, s5_session) as "5 - Add payment info",
      (s6_client, s6_user, s6_session) as "6 - Purchase"
    ))
  )

  select
    ## USER DATA
    user_date,
    client_id,
    user_id,
    user_channel_grouping,
    user_source,
    user_tld_source,
    user_campaign,
    user_device_type,
    user_country,
    user_language,
    user_type,
    new_user,
    returning_user,
  
    ## SESSION DATA
    session_date,
    session_number,
    session_id,
    session_start_timestamp,
    session_end_timestamp,
    session_duration_sec,
    session_channel_grouping,
    session_source,
    session_tld_source,
    session_campaign,
    cross_domain_session,  
    session_landing_page_category,
    session_landing_page_location,
    session_landing_page_title,
    session_exit_page_category,
    session_exit_page_location,
    session_exit_page_title,
    session_hostname,
    session_device_type,
    session_country,
    session_language,
    session_browser_name,
    event_date,
    step_name,
    
    lead(step_client_id, 1) over (partition by session_id order by step_name) as client_id_next_step,
    lead(step_user_id, 1) over (partition by session_id order by step_name) as user_id_next_step,
    lead(step_session_id, 1) over (partition by session_id order by step_name) as session_id_next_step
  from steps_pivot
  group by all
);