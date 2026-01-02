CREATE OR REPLACE TABLE FUNCTION `tom-moretti.nameless_analytics.gtm_performances`(start_date DATE, end_date DATE) AS (
  SELECT 
    -- USER DATA (Extracted precisely from events_raw to match context)
    user_date,
    client_id,
    (select value.string from unnest(session_data) where name = 'user_id') as user_id,
    (select value.string from unnest(user_data) where name = 'user_channel_grouping') as user_channel_grouping,
    (select value.string from unnest(user_data) where name = 'user_source') as user_source,
    (select value.string from unnest(user_data) where name = 'user_tld_source') as user_tld_source,
    (select value.string from unnest(user_data) where name = 'user_campaign') as user_campaign,
    (select value.string from unnest(user_data) where name = 'user_device_type') as user_device_type,
    (select value.string from unnest(user_data) where name = 'user_country') as user_country,
    (select value.string from unnest(user_data) where name = 'user_language') as user_language,
    case 
      when (select value.int from unnest(session_data) where name = 'session_number') = 1 then 'new_user'
      else 'returning_user'
    end as user_type,

    -- SESSION DATA
    session_date,
    (select value.int from unnest(session_data) where name = 'session_number') as session_number,
    session_id,
    (select value.int from unnest(session_data) where name = 'session_start_timestamp') as session_start_timestamp,
    (select value.int from unnest(session_data) where name = 'session_end_timestamp') as session_end_timestamp,
    (select value.string from unnest(session_data) where name = 'session_browser_name') as session_browser_name,

    -- PAGE DATA (STRUCT Transformation for debugging)
    ARRAY(
      SELECT AS STRUCT
        name,
        STRUCT(
          value.string AS string,
          value.int AS int,
          value.float AS float,
          TO_JSON_STRING(value.json) AS json
        ) AS value
      FROM UNNEST(page_data)
    ) AS page_data,

    -- EVENT DATA
    event_date,
    timestamp_millis(event_timestamp) as event_datetime,
    event_timestamp,
    (select value.int from unnest(gtm_data) where name = 'processing_event_timestamp') as processing_event_timestamp,
    (select value.int from unnest(gtm_data) where name = 'processing_event_timestamp') - event_timestamp AS delay_in_milliseconds,
    event_origin,
    (select value.int from unnest(gtm_data) where name = 'content_length') as content_length,
    (select value.string from unnest(gtm_data) where name = 'cs_hostname') AS cs_hostname,
    (select value.string from unnest(gtm_data) where name = 'ss_hostname') AS ss_hostname,
    (select value.string from unnest(gtm_data) where name = 'cs_container_id') AS cs_container_id,
    (select value.string from unnest(gtm_data) where name = 'ss_container_id') AS ss_container_id,
    ROW_NUMBER() OVER (PARTITION BY client_id, session_id ORDER BY event_timestamp ASC) AS hit_number,
    event_name,
    event_id,
    ARRAY(
      SELECT AS STRUCT
        name,
        STRUCT(
          value.string AS string,
          value.int AS int,
          value.float AS float,
          TO_JSON_STRING(value.json) AS json
        ) AS value
      FROM UNNEST(event_data)
    ) AS event_data,
    TO_JSON_STRING(ecommerce) as ecommerce,
    TO_JSON_STRING(dataLayer) as dataLayer
  from `tom-moretti.nameless_analytics.events_raw`
  where event_date between start_date and end_date
);