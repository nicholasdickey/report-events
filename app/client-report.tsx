'use client'

import React, { useState } from "react";
import useSWRInfinite from 'swr/infinite'
import { FetchReportKey, fetchReport } from "@/lib/api";
import ReportItem from "@/components/func-components/report-item";
import LoadMore from "@/components/func-components/load-more";

export default function Home() {
    const [expanded, setExpanded] = useState<string>("");
    const [target, setTarget] = useState<string>("qwiket");
    const [bot, setBot] = useState<boolean>(false);
    console.log("bot=", bot)
    const fetchReportKey = (pageIndex: number, previousPageData: any): FetchReportKey | null => {
        let key: FetchReportKey = { target, page: pageIndex, bot };
        if (previousPageData && !previousPageData.length) return null // reached the end
        return key;
    }
    const { data, error: storiesError, mutate, size, setSize, isValidating, isLoading } = useSWRInfinite(fetchReportKey, fetchReport, { initialSize: 1, revalidateAll: true, parallel: true })
    if (data)
        console.log("R1", ...(data as any[]))

    //let report:{}={};

    let itemsAll: any[] = [];
    if (data)
        for (let i = 0; i < data.length; i++) {
            const sub = data[i];
            for (const key in sub) {
                const item = sub[key];
                const { sessionid, items } = item
                itemsAll.push(ReportItem(expanded, setExpanded, item, bot))
            }
        };
    const isLoadingMore =
        isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
    let isEmpty = data?.[0]?.length === 0;
    let isReachingEnd =
        isEmpty || (data && data[data.length - 1]?.length < 5);
    return (
        <main className="w-full  flex flex-col justify-between border-cyan-900" >
            <div className="min-h-32 flex w-full justify-center border-b-2 border-inherit items-center" >
                <div className="text-2xl">User Sessions Log</div>
            </div>
            <div className="flex h-full border-inherit">
                <div className="Sidebar basis-1/5 border-r-2 border-inherit h-full p-4" >
                    <form className="max-w-sm mx-auto">
                        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select a target app</label>
                        <select defaultValue={"qwiket"} onChange={(event) => setTarget(event.target.value)} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="qwiket">Qwiket</option>
                            <option value="pray50">Pray50</option>

                        </select>
                        <div className="flex items-center mb-4 mt-4">
                            <input onChange={(event) => { console.log("setBot=", event.target.checked); setBot(event.target.checked ? true : false) }} id="disabled-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="disabled-checkbox" className="ms-2 text-sm font-medium text-gray-400 dark:text-gray-500">Include Bots</label>
                        </div>
                    </form>
                    <div className="clear-both"></div>


                </div>
                <div className="MainContent basis-4/5 ">
                    <table className=" p-4">
                        <thead className="h-16"><tr><th className="w-1/5">Timestamp</th><th className="w-3/5">Item</th><th className="w-1/5">Count</th></tr></thead>
                        {itemsAll}
                    </table>
                    
                    </div>
                  


            </div>
            <div className="w-full flex justify-center mb-8 mt-16"><button className="mx-auto w-32"><LoadMore setSize={setSize} size={size} isLoadingMore={isLoadingMore || false} isReachingEnd={isReachingEnd || false} /></button>
            </div>
            

        </main>

    );
}
