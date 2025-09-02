import { NextResponse } from "next/server";
import Video from "@/app/models/video";
import dbConnect from "@/app/lib/dbConnect";

export async function GET() {
  try {
    await dbConnect();
    const videos = await Video.find().sort({ createdAt: -1 });
    return NextResponse.json(videos);
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    if (!req.body) {
      return NextResponse.json({ error: "Request body is empty" }, { status: 400 });
    }
    const body = await req.json();
    
    // Basic auth: only doctor can post
    if (body.secret !== process.env.DOCTOR_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const video = await Video.create(body);
    return NextResponse.json(video, { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
