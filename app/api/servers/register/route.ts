import {auth} from "@/app/auth";
import {fetchStreamData} from "@/utils/readerStream";
import { NextResponse } from 'next/server'
import {json} from "node:stream/consumers";

export async function GET() {
    const session = await auth()
    const discordId = session?.user?.id
    const cfxId = ""
    const res = await fetchStreamData( 'https://servers-frontend.fivem.net/api/servers/single/rvzy77')
    if (res.Data.ownerName ===cfxId){
        return NextResponse.json({},{status:200})
    }
    return NextResponse.json({message: `${res.Data.ownerName}でログインしてください`},{status:403})
}
