// SWR infinite:
// SWR get stories and mentions grouped by story
// 
export type FetchReportKey = { target: string, page: number,bot:boolean,min:number };
export const fetchReport = async ({ target, page,bot,min }: FetchReportKey) => {
  try {

    console.log("api: fetchReport", target, page)
    let url = '';
    if(target=='qwiket')
        url = `${process.env.NEXT_PUBLIC_LAKEAPI}/api/v41/findexar/events/report?page=${page || 0}&bot=${bot?1:0}&min=${min}`;
    else
        url =  `${process.env.NEXT_PUBLIC_LAKEAPI}/api/v41/prayer/report?page=${page||0}&bot=${bot?1:0}&min=${min}`;
    
    console.log("fetchReport-url", url)
    // const res = await axios.get(url);
    const res = await fetch(url);
    const data = await res.json();
    console.log("fetchReport", data);
    return data.report;
  }
  catch (e) {
    console.log("fetchReport", e);
    return false;
  }
}

