import React, { useState } from 'react';

const ReportStatsItem = (expanded: string, setExpanded: any, reportItem: any) => {
    console.log("ReportstatsItem", reportItem)

    let { events_count, intervals_count, first_interval_millis, last_interval_millis, last_event_millis, sessionid } = reportItem;
    // stamp=stamp.replace("T"," ").replace("Z","");
    let itemDuration = last_event_millis-first_interval_millis;
    console.log("itemDuration:", itemDuration)
    //copilot: convert to days, hours, minutes, seconds
    let days = Math.floor(itemDuration / (1000 * 60 * 60 * 24));
    let hours = Math.floor((itemDuration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((itemDuration % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((itemDuration % (1000 * 60)) / 1000);
    //copilot: format the output
    let itemDurationStr = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    //copilot format first_interval_millis as datetime
    let stamp = new Date(last_event_millis).toLocaleString();
    
    let cs = false;
    const intervals = reportItem.intervals.map((record: any, i: number) => {
        console.log("interval:", record);
        let { millis_start, millis_end, events } = record;
        let intervalDuration = millis_end - millis_start;
        //copilot: convert to days, hours, minutes, seconds
        let days = Math.floor(intervalDuration / (1000 * 60 * 60 * 24));
        let hours = Math.floor((intervalDuration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((intervalDuration % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((intervalDuration % (1000 * 60)) / 1000);
        //copilot: format the output
        let intervalDurationStr = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        //copilot format millis_start as datetime
        let millis_start_str = new Date(millis_start).toLocaleString();


        const items = record.events.map((record: any, i: number) => {
            console.log("record:", record);
            let { request = "", prayer = "", teamid = "", label = "", ogImage = "", url, name: eventName, utm_content = '', league = '', params = '', fbclid = '', team = '', stamp: itemStamp = '', player = '', slug = '', view = '', time = '', isMobile, ssrTime, userId, t1, findexarxid, story, sid, ua } = record;
            request = decodeURIComponent(request);
            prayer = decodeURIComponent(prayer).replaceAll('<p>', '').replaceAll('</p>', '');
            itemStamp = itemStamp.replace("T", " ").replace("Z", "");
            //console.log("ReportItem", record, stamp, name)
            if (eventName.indexOf('ssr') < 0)
                cs = true;

            return (
                <tr key={`keisggaa-${i}`} className="bg-slate-600 text-yellow-200 h-64 py-8">
                    <td className="border p-4" key={`keyasp-${i}=td1`} >{itemStamp}</td>
                    <td colSpan={3} className="border p-4 space-32 max-w-128  text-balance break-words" key={`keyasp-${i}=td2`}>
                        <div><span className=" text-green-200">Name: </span> {eventName}</div>
                        {ssrTime && <div><span className=" text-green-200">SSR Time: </span>{ssrTime}</div>}
                        {time && <div><span className=" text-green-200">SPA Time: </span>{time}</div>}
                        {false && t1 && <div><span className=" text-green-200">SSR start time (t1): </span>{t1}</div>}
                        {false&&params && <div className="max-w-96 text-balance break-words">Params{params}</div>}
                        {fbclid && <div><span className=" text-green-200">fbclid: </span>{fbclid}</div>}
                        {stamp && <div><span className=" text-green-200">stamp:</span>{stamp}</div>}
                        {league && <div><span className=" text-green-200">League:</span>{league}</div>}
                        {team && <div>Team:<span className=" text-green-200"></span>{team}</div>}
                        {player && <div><span className=" text-green-200">Player:</span>{player}</div>}
                        {slug && <div><span className=" text-green-200">Slug:</span>{slug}</div>}
                        {url && <div><span className=" text-green-200">Url:</span>{url}</div>}
                        {ogImage && <div><span className=" text-green-200">og:image:</span>{ogImage}</div>}
                        {view && <div><span className=" text-green-200">View:</span>{view}</div>}
                        {sid && <div><span className=" text-green-200">SID:</span>{sid}</div>}
                        {teamid && <div><span className=" text-green-200">Team:</span>{teamid}</div>}
                        {label && <div><span className=" text-green-200">Label:</span>{label}</div>}
                        {ua && <div><span className=" text-green-200">User Agent:</span>{ua}</div>}
                        {utm_content && <div><span className=" text-green-200">utm_content:</span>{utm_content}</div>}
                        {userId && <div><span className=" text-green-200">userId:</span>{userId}</div>}
                        {findexarxid && <div><span className=" text-green-200">findexarxid:</span>{findexarxid}</div>}
                        {story && <div><span className=" text-green-200">story:</span>{story}</div>}
                        {isMobile && <div><span className=" text-green-200">isMobile:{isMobile}</span></div>}
                        {eventName == 'story-click' && story && <>
                            <div><span className=" text-green-200">story-url:</span>{story.url}</div>
                            <div><span className=" text-green-200">story-title:</span>{story.title}</div>
                            <div><span className=" text-green-200">story-slug:</span>{story.slug}</div>
                            <div><span className=" text-green-200">story-summary:</span>{story.summary}</div>
                        </>}
                        {request && <div><span>Request:</span>{request}</div>}
                        {prayer && <div><span>Prayer:</span>{prayer}</div>}
                    </td>
                </tr>
            )
        });
        return (
            <tr key={`keisggaa-${i}`} className={`${i%2?'bg-green-900':'bg-blue-600'} text-yellow-200 h-64 py-8`}>
                <td className="border p-4" key={`keyasp-${i}=td1`} >{millis_start_str}</td>
                <td colSpan={3} className="border p-4 space-32" key={`keyasp-${i}=td2`}>
                    <div>Interval Duration: {intervalDurationStr}</div>
                    <table className="border-zinc-500" key={`report-item-${i}`} >
                        <tr>
                            <th className="border p-4">Time</th>
                            <th className="border p-4">Event</th>
                        </tr>
                        {items}
                    </table>
                </td>
            </tr>
        )
    });



    if (expanded != sessionid)
        return <tr className={`border p-4 h-8 cursor-pointer`} onClick={() => setExpanded(sessionid)}>
            <td className="border p-4">{stamp}</td>
            <td className="border p-4">{itemDurationStr}</td>
            <td className="border p-4">{intervals_count}</td>
            <td className="border p-4">{events_count}</td>
            <td className={`border p-4`}>{sessionid}</td>
          </tr>
    else
        return <tr className="border-red bg-red-900 cursor-pointer" onClick={() => setExpanded("")}>
            <td>{stamp} <br />{sessionid}</td>
            <td colSpan={6}>
                <table className="border-zinc-500" key={`report-item-${sessionid}`} >
                    <tr>
                        <th className="border p-4">Time</th>
                        <th className="border p-4" colSpan={5}>Duration</th>
                     
                       
                    </tr>
                         {intervals}
                 </table>
            </td>
            <td className="border text-center p-4 h-32">{intervals_count}</td></tr>
}

export default ReportStatsItem;
