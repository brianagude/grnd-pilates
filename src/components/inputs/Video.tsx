"use client";

import dynamic from "next/dynamic";
import Image from "next/image";

const MuxPlayer = dynamic(() => import("@mux/mux-player-react"), {
	ssr: false,
});

interface VideoProps {
	playbackId: string;
	title?: string;
	classes?: string;
	time?: number;
}

export default function Video({ playbackId, classes, time = 0, title = "Pilates Video" }: VideoProps) {
	if (!playbackId) return null;

	return (
		<>
			<div className="absolute inset-0 bg-black/30 z-10" />
			{/* <Image
				src={`https://image.mux.com/${playbackId}/thumbnail.jpg?time=${time}`}
				alt={title}
				className="object-cover w-full h-full"
				fill
				priority
				sizes="100vw"
			/> */}
			<MuxPlayer
				playbackId={playbackId}
				metadata={{ video_title: title }}
				autoPlay
				muted
				loop
				nohotkeys
			/>
		</>
	);
}
