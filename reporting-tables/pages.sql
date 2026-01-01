CREATE OR REPLACE TABLE FUNCTION `tom-moretti.nameless_analytics.pages`(start_date DATE, end_date DATE) AS (
with base_events as (
    select * from `tom-moretti.nameless_analytics.events`(start_date, end_date, 'page')
  ),

  page_prep as (
    select
      ## USER DATA
      user_date, 
      client_id, 
      user_id, 
      user_channel_grouping, 
      split(user_tld_source, '.')[safe_offset(0)] as user_source,
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
      session_duration_sec,
      session_channel_grouping, 
      split(session_tld_source, '.')[safe_offset(0)] as session_source,
      session_tld_source, 
      session_campaign, 
      session_device_type, 
      session_country, 
      session_browser_name,
      session_language,
      cross_domain_session, 
      session_landing_page_category, 
      session_landing_page_location, 
      session_landing_page_title, 
      session_exit_page_category, 
      session_exit_page_location, 
      session_exit_page_title, 
      session_hostname,

      ## PAGE DATA
      page_date,
      page_id,
      page_view_number,
      page_location,
      page_hostname,
      page_title,
      page_category,
      page_load_timestamp,
      timestamp_millis(page_load_timestamp) as page_load_datetime,
      page_unload_timestamp,
      timestamp_millis(page_unload_timestamp) as page_unload_datetime,
      
      -- Performance metrics (aggregated at page_id level in next step)
      max(time_to_dom_interactive) as max_time_to_dom_interactive,
      max(page_render_time) as max_page_render_time,
      max(time_to_dom_complete) as max_time_to_dom_complete,
      max(total_page_load_time) as max_total_page_load_time,
      max(page_status_code) as max_page_status_code,

      ## EVENT DATA
      countif(event_name = 'page_view') as page_view,
    from base_events
    group by all
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
    session_duration_sec,
    session_channel_grouping,
    session_source,
    session_tld_source,
    session_campaign,
    session_device_type,
    session_country,
    session_browser_name,
    session_language,
    cross_domain_session,
    session_landing_page_category,
    session_landing_page_location,
    session_landing_page_title,
    session_exit_page_category,
    session_exit_page_location,
    session_exit_page_title,
    session_hostname,

    ## PAGE DATA
    page_date,
    page_id,
    page_view_number,
    page_location,
    page_hostname,
    page_title,
    page_category,
    page_load_datetime,
    page_unload_datetime,
    (page_unload_timestamp - page_load_timestamp) / 1000 as time_on_page,
    max_time_to_dom_interactive / 1000 as time_to_dom_interactive,
    max_page_render_time / 1000 as page_render_time,
    max_time_to_dom_complete / 1000 as time_to_dom_complete,
    max_total_page_load_time / 1000 as page_load_time_sec,
    max_page_status_code as page_status_code,
    
    ## TOTALS
    sum(page_view) as page_view,
  from page_prep
  group by all
);