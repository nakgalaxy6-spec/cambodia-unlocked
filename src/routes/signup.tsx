import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  User,
  Store,
  ShieldCheck,
  Compass,
  Lock,
  Mail,
  Phone,
  Building2,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/lib/i18n";
import { useAuth, type UserRole } from "@/lib/auth";
import { img } from "@/lib/images";
import { toast } from "sonner";
import { businessCategories } from "@/lib/data";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create Account – Cambodia Unlocked | ចុះឈ្មោះ" },
      {
        name: "description",
        content:
          "Join Cambodia Unlocked as a traveler, local business owner, or administrator.",
      },
    ],
  }),
  component: SignUpPage,
});

function SignUpPage() {
  const { t, tc } = useI18n();
  const { signup, getDashboardUrl } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState<UserRole>("traveler");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessCategory, setBusinessCategory] = useState<string>("Community Tourism");
  const [location, setLocation] = useState("Siem Reap, Cambodia");
  const [agreed, setAgreed] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error(t("Please enter your name", "សូមបញ្ចូលឈ្មោះរបស់អ្នក"));
      return;
    }
    if (!email.trim()) {
      toast.error(t("Please enter your email", "សូមបញ្ចូលអ៊ីមែលរបស់អ្នក"));
      return;
    }
    if (role === "business" && !businessName.trim()) {
      toast.error(
        t("Please enter your business name", "សូមបញ្ចូលឈ្មោះអាជីវកម្មរបស់អ្នក")
      );
      return;
    }
    if (!agreed) {
      toast.error(
        t("Please agree to the platform terms", "សូមយល់ព្រមតាមលក្ខខណ្ឌវេទិកា")
      );
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const user = signup({
        name,
        email,
        role,
        phone,
        businessName: role === "business" ? businessName : undefined,
        businessCategory: role === "business" ? businessCategory : undefined,
        location,
      });

      setIsLoading(false);
      toast.success(
        t(
          `Account created successfully! Welcome, ${user.name}!`,
          `បានបង្កើតគណនីដោយជោគជ័យ! សូមស្វាគមន៍ ${user.name}!`
        ),
        {
          description: t(
            `Logged in as ${user.role}. Setting up your dashboard...`,
            `បានចូលជា ${
              user.role === "traveler"
                ? "ភ្ញៀវទេសចរ"
                : user.role === "business"
                ? "ម្ចាស់អាជីវកម្ម"
                : "អ្នកគ្រប់គ្រង"
            }។ កំពុងរៀបចំផ្ទាំងគ្រប់គ្រង...`
          ),
        }
      );

      const dest = getDashboardUrl(user.role);
      navigate({ to: dest });
    }, 450);
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-background via-sand/30 to-sky/40 py-10">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {/* Top Header Card */}
        <div className="text-center space-y-2 mb-8">
          <div className="flex justify-center mb-3">
            <img
              src="/images/cambodia-unlocked-logo.jpg"
              alt="Cambodia Unlocked Logo"
              className="size-16 rounded-2xl shadow-lg ring-2 ring-gold/40 object-cover"
            />
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal-soft px-3.5 py-1 text-xs font-semibold text-teal">
            <Sparkles className="size-3.5" />
            {t("Join Cambodia Unlocked", "ចូលរួមជាមួយ Cambodia Unlocked")}
          </span>
          <h1 className="font-display text-3xl font-extrabold text-navy sm:text-4xl">
            {t("Create your account", "បង្កើតគណនីរបស់អ្នក")}
          </h1>
          <p className="max-w-xl mx-auto text-sm text-muted-foreground">
            {t(
              "Join our Siem Reap pilot community. Connect with authentic experiences, showcase local businesses, and foster sustainable tourism.",
              "ចូលរួមជាមួយសហគមន៍សាកល្បងសៀមរាប។ ស្វែងរកបទពិសោធន៍ពិតប្រាកដ បង្ហាញអាជីវកម្មក្នុងស្រុក និងគាំទ្រទេសចរណ៍និរន្តរភាព។"
            )}
          </p>
        </div>

        {/* Main Form Container */}
        <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-xl sm:p-10">
          <form onSubmit={handleRegister} className="space-y-8">
            {/* 1. ROLE SELECTION */}
            <div className="space-y-3">
              <div>
                <Label className="text-base font-bold text-navy">
                  {t("Step 1: Choose Your Account Role", "ជំហានទី ១៖ ជ្រើសរើសតួនាទីគណនី")}
                </Label>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {t(
                    "Each role has a specialized dashboard tailored to your needs.",
                    "តួនាទីនីមួយៗមានផ្ទាំងគ្រប់គ្រងដែលត្រូវតាមតម្រូវការជាក់ស្តែង។"
                  )}
                </p>
              </div>

              <div className="grid gap-3.5 sm:grid-cols-3">
                {[
                  {
                    id: "traveler" as UserRole,
                    title: t("Traveler / Guest", "ភ្ញៀវទេសចរ"),
                    desc: t(
                      "Explore destinations, build custom itineraries, save favorites, and contact local guides directly.",
                      "ស្វែងរកគោលដៅ រៀបចំដំណើរកម្សាន្ត រក្សាទុកកន្លែង និងទាក់ទងអ្នកក្នុងស្រុកផ្ទាល់។"
                    ),
                    icon: User,
                    tag: t("Most Popular", "ពេញនិយម"),
                  },
                  {
                    id: "business" as UserRole,
                    title: t("Local Business Owner", "ម្ចាស់អាជីវកម្ម"),
                    desc: t(
                      "List your business free, showcase services, receive traveler inquiries, and grow your local impact.",
                      "ចុះបញ្ជីឥតគិតថ្លៃ បង្ហាញសេវាកម្ម ទទួលសំណួរពីភ្ញៀវ និងបង្កើនប្រាក់ចំណូល។"
                    ),
                    icon: Store,
                    tag: t("Free Profile", "ឥតគិតថ្លៃ"),
                  },
                  {
                    id: "admin" as UserRole,
                    title: t("Platform Admin", "អ្នកគ្រប់គ្រង"),
                    desc: t(
                      "Manage business verifications, monitor community impact, and oversee platform performance.",
                      "ផ្ទៀងផ្ទាត់អាជីវកម្ម តាមដានផលជះសហគមន៍ និងត្រួតពិនិត្យប្រព័ន្ធ។"
                    ),
                    icon: ShieldCheck,
                    tag: t("Executive", "អ្នកគ្រប់គ្រង"),
                  },
                ].map((item) => {
                  const isSelected = role === item.id;
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setRole(item.id)}
                      className={`relative flex flex-col justify-between rounded-2xl border p-4 cursor-pointer transition-all ${
                        isSelected
                          ? "border-teal bg-teal-soft/40 shadow-card ring-2 ring-teal"
                          : "border-border bg-card hover:border-teal/40 hover:bg-muted/30"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className={`grid size-10 place-items-center rounded-xl transition ${
                              isSelected
                                ? "bg-teal text-white shadow-sm"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            <Icon className="size-5" />
                          </span>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                              isSelected
                                ? "bg-teal text-white"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {item.tag}
                          </span>
                        </div>
                        <h3 className="font-display font-semibold text-navy text-sm sm:text-base">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                          {item.desc}
                        </p>
                      </div>

                      <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-teal">
                        <CheckCircle2
                          className={`size-4 ${
                            isSelected ? "text-teal fill-teal/20" : "text-muted-foreground/30"
                          }`}
                        />
                        <span>
                          {isSelected
                            ? t("Selected", "បានជ្រើសរើស")
                            : t("Select role", "ជ្រើសរើស")}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. PROFILE & CREDENTIALS */}
            <div className="space-y-4 border-t border-border pt-6">
              <div>
                <Label className="text-base font-bold text-navy">
                  {t("Step 2: Basic Information", "ជំហានទី ២៖ ព័ត៌មានមូលដ្ឋាន")}
                </Label>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {t(
                    "Your personal contact and security details.",
                    "ព័ត៌មានផ្ទាល់ខ្លួន និងសុវត្ថិភាពគណនីរបស់អ្នក។"
                  )}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="s-name" className="text-xs font-semibold text-navy">
                    {t("Full Name / ឈ្មោះពេញ", "ឈ្មោះពេញ")} *
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="s-name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={
                        role === "business"
                          ? "Chanreay Sok"
                          : role === "admin"
                          ? "Borey Seng"
                          : "Sokchan Min"
                      }
                      className="h-11 rounded-xl pl-9"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="s-email" className="text-xs font-semibold text-navy">
                    {t("Email Address / អ៊ីមែល", "អាសយដ្ឋានអ៊ីមែល")} *
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="s-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="hello@example.kh"
                      className="h-11 rounded-xl pl-9"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="s-phone" className="text-xs font-semibold text-navy">
                    {t("Phone Number / លេខទូរសព្ទ", "លេខទូរសព្ទ")}
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="s-phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+855 12 345 678"
                      className="h-11 rounded-xl pl-9"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="s-loc" className="text-xs font-semibold text-navy">
                    {t("Location / ទីតាំង", "ទីតាំង")}
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="s-loc"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Siem Reap, Cambodia"
                      className="h-11 rounded-xl pl-9"
                    />
                  </div>
                </div>
              </div>

              {/* DYNAMIC BUSINESS SPECIFIC FIELDS */}
              {role === "business" && (
                <div className="mt-4 rounded-2xl border border-gold/40 bg-gold-soft/30 p-4 space-y-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-navy">
                    <Building2 className="size-4 text-gold" />
                    <span>{t("Business Details / ព័ត៌មានអាជីវកម្ម", "ព័ត៌មានអាជីវកម្ម")}</span>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="b-name" className="text-xs font-semibold text-navy">
                        {t("Business Name", "ឈ្មោះអាជីវកម្ម")} *
                      </Label>
                      <Input
                        id="b-name"
                        required
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="Village Pottery Studio"
                        className="h-11 rounded-xl bg-card"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="b-cat" className="text-xs font-semibold text-navy">
                        {t("Business Category", "ប្រភេទអាជីវកម្ម")}
                      </Label>
                      <select
                        id="b-cat"
                        value={businessCategory}
                        onChange={(e) => setBusinessCategory(e.target.value)}
                        className="h-11 w-full rounded-xl border border-input bg-card px-3 py-2 text-sm text-navy outline-none"
                      >
                        {businessCategories.map((cat) => (
                          <option key={cat} value={cat}>
                            {tc(cat)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* PASSWORDS */}
              <div className="grid gap-4 sm:grid-cols-2 pt-2">
                <div className="space-y-1.5">
                  <Label htmlFor="s-pwd" className="text-xs font-semibold text-navy">
                    {t("Password / ពាក្យសម្ងាត់", "ពាក្យសម្ងាត់")} *
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="s-pwd"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="h-11 rounded-xl pl-9"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="s-pwd2" className="text-xs font-semibold text-navy">
                    {t("Confirm Password / បញ្ជាក់ពាក្យសម្ងាត់", "បញ្ជាក់ពាក្យសម្ងាត់")} *
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="s-pwd2"
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="h-11 rounded-xl pl-9"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* AGREEMENT & SUBMIT */}
            <div className="space-y-4 border-t border-border pt-4">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs text-muted-foreground">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="rounded border-border text-teal focus:ring-teal size-4"
                />
                <span>
                  {t(
                    "I agree to Cambodia Unlocked's Terms of Service and Privacy Policy.",
                    "ខ្ញុំយល់ព្រមតាមលក្ខខណ្ឌប្រើប្រាស់ និងគោលការណ៍ឯកជនភាពរបស់ Cambodia Unlocked។"
                  )}
                </span>
              </label>

              <Button
                type="submit"
                disabled={isLoading}
                className="h-12 w-full rounded-full bg-gold text-base font-bold text-gold-foreground shadow-md transition hover:bg-gold/90 hover:shadow-lg"
              >
                {isLoading ? (
                  t("Creating your account...", "កំពុងបង្កើតគណនី...")
                ) : (
                  <span className="inline-flex items-center gap-2">
                    {t("Create Account & Access Dashboard", "បង្កើតគណនី និងចូលផ្ទាំងគ្រប់គ្រង")}
                    <ArrowRight className="size-4" />
                  </span>
                )}
              </Button>
            </div>
          </form>

          {/* Already have an account footer */}
          <div className="mt-8 border-t border-border pt-4 text-center">
            <p className="text-sm text-muted-foreground">
              {t("Already have an account?", "តើអ្នកមានគណនីរួចហើយមែនទេ?")}{" "}
              <Link
                to="/login"
                className="font-semibold text-teal hover:underline inline-flex items-center gap-1"
              >
                {t("Sign In here", "ចូលគណនីនៅទីនេះ")}
                <ChevronRight className="size-3.5" />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
