import Image from "next/image";

export default function DemoTemplate() {
    const templates = [
        "/images/reels/reels01.png",
        "/images/reels/reels02.png",
        "/images/reels/reels03.png",
        "/images/reels/reels04.png",
        "/images/reels/reels05.png",
        "/images/reels/reels06.png",
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-600 via-indigo-500 to-indigo-700 py-16">
            <div className="max-w-5xl mx-auto px-6">
                <h1 className="text-3xl font-bold text-center text-slate-900 mb-10">Contoh Template</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {templates.map((src, i) => (
                        <div key={i} className="rounded-xl bg-white shadow-lg p-4 flex flex-col items-center">
                            <Image
                                src={src}
                                alt={`Template ${i + 1}`}
                                width={320}
                                height={220}
                                className="rounded-lg object-contain mb-4"
                            />
                            <span className="font-medium text-slate-700">Template {i + 1}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
