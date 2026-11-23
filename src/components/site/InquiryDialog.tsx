import { useI18n } from "@/lib/i18n";
import { useState, type ReactNode } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function InquiryForm({ provider, onDone }: { provider: string; onDone?: () => void }) {
  const { t } = useI18n();
  return (
    <form
      className="space-y-3"
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const name = String(fd.get("name") ?? "").trim();
        if (!name) {
          toast.error("Please add your name");
          return;
        }
        toast.success(`Inquiry sent to ${provider}`, { description: "They usually reply within 24 hours. Track it in My Inquiries." });
        e.currentTarget.reset();
        onDone?.();
      }}
    >
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="iq-name">{t("Your name", "ឈ្មោះរបស់អ្នក")}</Label>
          <Input id="iq-name" name="name" placeholder={t("Sokchan", "សុខចាន់")} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="iq-email">{t("Email", "អ៊ីមែល")}</Label>
          <Input id="iq-email" name="email" type="email" placeholder="you@email.com" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="iq-date">{t("Travel date", "ថ្ងៃធ្វើដំណើរ")}</Label>
          <Input id="iq-date" name="date" type="date" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="iq-group">{t("Group size", "ចំនួនអ្នកចូលរួម")}</Label>
          <Input id="iq-group" name="group" type="number" min={1} defaultValue={2} />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="iq-msg">{t("Your message", "សាររបស់អ្នក")}</Label>
        <Textarea id="iq-msg" name="message" rows={4} placeholder={t("Hi! We'd love to visit…", "សួស្តី! យើងចង់មកទស្សនា…")} />
      </div>
      <Button type="submit" className="w-full bg-teal hover:bg-teal/90">{t("Send Inquiry", "ផ្ញើសំណួរ")}</Button>
    </form>
  );
}

export function InquiryDialog({ provider, trigger }: { provider: string; trigger: ReactNode }) {
  const { t, tc } = useI18n();
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("Contact", "ទាក់ទង")} {tc(provider)}</DialogTitle>
          <DialogDescription>{t("Your message goes directly to the local provider – no booking fees.", "សាររបស់អ្នកត្រូវបានផ្ញើទៅអ្នកផ្តល់សេវាក្នុងស្រុកដោយផ្ទាល់ ដោយមិនគិតកម្រៃកក់។")}</DialogDescription>
        </DialogHeader>
        <InquiryForm provider={provider} onDone={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
