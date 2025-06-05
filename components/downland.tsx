'use client'

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";


export function ClientReadButton({ file}: { file: string}) {
  const server_url = process.env.NEXT_PUBLIC_SERVER_URL!;
  console.log(file)
  const handleDownload = async () => {
    const response = await fetch(`${server_url}/files/${file}`, {
     
    });

    if (!response.ok) {
      toast({ description: 'Nimadur xato ketdi!', variant: "destructive" });
      return;
    }

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    // Faylni yangi tabda ochish (o‘qish)
    window.open(url, "_blank");

    // Keyin URL ni tozalash
    setTimeout(() => window.URL.revokeObjectURL(url), 1000);
  };

  return (
    <Button onClick={handleDownload} className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
      Yuklab olish
    </Button>
  );
}
