import Image from "next/image";
import React,{useState} from "react";
import { unstable_serialize } from 'swr' 
import { unstable_serialize as infinite_unstable_serialize } from 'swr/infinite' 
import {fetchReport,FetchReportKey} from '@/lib/api';
import Report from './client-report';

export default function Home() {
  return (
    <Report/>
  );
}
