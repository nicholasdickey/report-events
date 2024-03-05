import React, { useState } from 'react';

const ReportItem = (expanded:string,setExpanded:any,reportItem: any,bot:boolean)=> {
    console.log("ReportItem", reportItem)
 
    let { stamp, sessionid } = reportItem;
    stamp=stamp.replace("T"," ").replace("Z","");
    let cs = false;
    let isbot = false;
    const items = reportItem.items.map((record: any, i: number) => {
        console.log("record:", record);
        let { request="",prayer="",teamid = "", label = "", ogImage = "", url, name: eventName, utm_content = '', league = '', params = '', fbclid = '', team = '', stamp: itemStamp = '', player = '', slug = '', view = '', time = '', isMobile, ssrTime, userId, t1, findexarxid, story, sid, ua } = record;
        request = decodeURIComponent(request);
        prayer = decodeURIComponent(prayer).replaceAll('<p>', '').replaceAll('</p>', '');
        itemStamp=itemStamp.replace("T"," ").replace("Z","");
        console.log("ReportItem", record, stamp, name)
        if (eventName.indexOf('ssr') < 0)
            cs = true;
        if (eventName.indexOf('bot') >= 0) {
            isbot = true;
            console.log("===============>>>>bot", name);
            // return null
        }
         return (
            <tr key={`keisggaa-${i}`} className="bg-slate-600 text-yellow-200 h-64 py-8">
                <td className="border p-4" key={`keyasp-${i}=td1`} >{itemStamp}</td>
                <td className="border p-4 space-32" key={`keyasp-${i}=td2`}>
                    <div>Name: {eventName}</div>
                    {ssrTime && <div>SSR Time:{ssrTime}</div>}
                    {time && <div>SPA Time:{time}</div>}
                    {false && t1 && <div>SSR start time (t1):{t1}</div>}
                    {params && <div>Params{params}</div>}
                    {fbclid && <div>fbclid:{fbclid}</div>}
                    {stamp && <div>stamp:{stamp}</div>}
                    {league && <div>League:{league}</div>}
                    {team && <div>Team:{team}</div>}
                    {player && <div>Player:{player}</div>}
                    {slug && <div>Slug:{slug}</div>}
                    {url && <div>Url:{url}</div>}
                    {ogImage && <div>og:image:{ogImage}</div>}
                    {view && <div>View:{view}</div>}
                    {sid && <div>SID:{sid}</div>}
                    {teamid && <div>Team:{teamid}</div>}
                    {label && <div>Label:{label}</div>}
                    {ua && <div>User Agent:{ua}</div>}
                    {utm_content && <div>utm_content:{utm_content}</div>}
                    {userId && <div>userId:{userId}</div>}
                    {findexarxid && <div>findexarxid:{findexarxid}</div>}
                    {story && <div>story:{story}</div>}
                    {isMobile && <div>isMobile:{isMobile}</div>}
                    {eventName == 'story-click' && story && <>
                        <div>url:{story.url}</div>
                        <div>title:{story.title}</div>
                        <div>slug:{story.slug}</div>
                        <div>summary:{story.summary}</div>
                    </>}
                    {request && <div>Request:{request}</div>}
                    {prayer && <div>Prayer:{prayer}</div>}  
                </td>
            </tr>
        )
    });
    if(!bot &&isbot )
        return null;
    console.log("isbot=",isbot)
    if (expanded!=sessionid)
        return <tr  className={`border p-4 h-8 cursor-pointer ${isbot?'text-slate-200':''}`} onClick={() => setExpanded(sessionid)}><td  className="border p-4">{stamp}</td><td  className={`border p-4 ${isbot?'text-slate-700':''}`}>{sessionid}</td><td  className="border p-4 text-center">{reportItem.items.length}</td></tr>
    else 
         return <tr className="border-red bg-red-900 cursor-pointer" onClick={() => setExpanded("")}><td>{stamp}<br/>{sessionid}</td><td><table className="border-zinc-500" key={`report-item-${sessionid}`} >
        <tr>
            <th className="border p-4">Time</th>
            <th className="border p-4">Event</th>
        </tr>
        {items}
      </table></td><td className="border text-center p-4 h-32">{reportItem.items.length}</td></tr>
}
export default ReportItem;
