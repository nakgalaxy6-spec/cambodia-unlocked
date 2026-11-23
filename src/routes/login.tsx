import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  User,
  Store,
  ShieldCheck,
  Compass,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Heart,
  MapPin,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/lib/i18n";
import { useAuth, type UserRole, DEMO_ACCOUNTS } from "@/lib/auth";
import { img } from "@/lib/images";
import { toast } from "sonner";
import { AngkorSkyline } from "@/components/site/AngkorSkyline";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign In – Cambodia Unlocked | ចូលគណនី" },
      {
        name: "description",
        content:
          "Sign in to your Cambodia Unlocked account as a traveler, local business owner, tour guide, or platform admin.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { t, tc } = useI18n();
  const { login, quickLogin, getDashboardUrl } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState<UserRole>("traveler");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sync email input with selected demo role if empty
  const handleRoleChange = (r: UserRole) => {
    setRole(r);
    setEmail(DEMO_ACCOUNTS[r].email);
    setPassword("••••••••");
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const user = login(email || DEMO_ACCOUNTS[role].email, role);
      setIsLoading(false);
      toast.success(
        t(
          `Welcome back, ${user.name}!`,
          `សូមស្វាគមន៍ការត្រឡប់មកវិញ លោក/អ្នក ${user.name}!`
        ),
        {
          description: t(
            `Signed in as ${user.role.toUpperCase()}`,
            `បានចូលជា ${
              user.role === "traveler"
                ? "ភ្ញៀវទេសចរ"
                : user.role === "business"
                ? "ម្ចាស់អាជីវកម្ម"
                : "អ្នកគ្រប់គ្រង"
            }`
          ),
        }
      );
      const dest = getDashboardUrl(user.role);
      navigate({ to: dest });
    }, 400);
  };

  const handleQuickDemo = (demoRole: UserRole) => {
    const user = quickLogin(demoRole);
    toast.success(
      t(
        `Signed in as ${user.name}`,
        `បានចូលដោយជោគជ័យជា ${user.name}`
      ),
      {
        description: t(
          `Redirecting to your ${user.role} dashboard...`,
          `កំពុងប្តូរទៅកាន់ផ្ទាំងគ្រប់គ្រង ${
            user.role === "traveler"
              ? "អ្នកដំណើរ"
              : user.role === "business"
              ? "អាជីវកម្ម"
              : "អ្នកគ្រប់គ្រង"
          }...`
        ),
      }
    );
    const dest = getDashboardUrl(user.role);
    navigate({ to: dest });
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-background via-sky/40 to-sand/40">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center justify-center p-4 sm:p-6 lg:p-10">
        <div className="grid w-full overflow-hidden rounded-3xl border border-border/80 bg-card shadow-2xl lg:grid-cols-[1.1fr_1fr]">
          {/* LEFT SIDE: Visual Showcase & Brand Narrative */}
          <div className="relative hidden flex-col justify-between overflow-hidden bg-navy p-10 text-navy-foreground lg:flex">
            {/* Background Image with Warm Gradient Overlay */}
            <img
              src={img.hero}
              alt="Angkor Sunrise"
              className="absolute inset-0 h-full w-full object-cover opacity-35 transition duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-navy/40" />

            {/* Top Brand Header */}
            <div className="relative z-10 space-y-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/15 px-3 py-1 text-xs font-semibold text-gold backdrop-blur">
                <Sparkles className="size-3.5" />
                {t("Cambodia Unlocked • Tourism Ecosystem", "កម្ពុជា Unlocked • ប្រព័ន្ធអេកូទេសចរណ៍")}
              </span>
              <h2 className="pt-2 text-3xl font-extrabold tracking-tight text-white lg:text-4xl">
                {t("Discover Local Cambodia.", "ស្វែងយល់ពីកម្ពុជាក្នុងស្រុក។")}{" "}
                <span className="text-gold">
                  {t("Support Local Communities.", "គាំទ្រសហគមន៍មូលដ្ឋាន។")}
                </span>
              </h2>
              <p className="max-w-md text-sm text-navy-foreground/80">
                {t(
                  "Empowering travelers, authentic local artisans, and passionate business owners across Siem Reap.",
                  "ផ្តល់ឱកាសដល់អ្នកដំណើរ សិប្បករក្នុងស្រុក និងម្ចាស់អាជីវកម្មពិតប្រាកដនៅទូទាំងសៀមរាប។"
                )}
              </p>
            </div>

            {/* Middle Feature Highlights */}
            <div className="relative z-10 space-y-2.5 py-4">
              {[
                {
                  icon: User,
                  title: t("For Travelers / សម្រាប់ភ្ញៀវ", "សម្រាប់ភ្ញៀវទេសចរ"),
                  desc: t(
                    "Save hidden gems, build custom itineraries, and contact local guides directly.",
                    "រក្សាទុកកន្លែងពិសេស រៀបចំដំណើរកម្សាន្ត និងទាក់ទងអ្នកក្នុងស្រុកផ្ទាល់។"
                  ),
                },
                {
                  icon: Compass,
                  title: t("For Tour Guides / សម្រាប់មគ្គុទ្ទេសក៍", "សម្រាប់មគ្គុទ្ទេសក៍ទេសចរណ៍"),
                  desc: t(
                    "Receive direct bookings, partner with local businesses, 0% commission.",
                    "ទទួលការកក់ផ្ទាល់ ភ្ជាប់ទំនាក់ទំនងជាមួយអាជីវកម្មក្នុងស្រុក គ្មានកម្រៃជើងសារ។"
                  ),
                },
                {
                  icon: Store,
                  title: t("For Local Businesses / សម្រាប់អាជីវកម្ម", "សម្រាប់ម្ចាស់អាជីវកម្ម"),
                  desc: t(
                    "Free profiles, direct inquiries, showcase authentic products & tours.",
                    "ប្រវត្តិរូបឥតគិតថ្លៃ ទទួលសំណួរផ្ទាល់ និងបង្ហាញសេវាកម្មពិតៗ។"
                  ),
                },
                {
                  icon: ShieldCheck,
                  title: t("For Platform Admins / សម្រាប់អ្នកគ្រប់គ្រង", "សម្រាប់អ្នកគ្រប់គ្រង"),
                  desc: t(
                    "Verify businesses & guides, track community growth, and manage operations.",
                    "ផ្ទៀងផ្ទាត់អាជីវកម្មនិងមគ្គុទ្ទេសក៍ តាមដានការរីកចម្រើនសហគមន៍។"
                  ),
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-md"
                >
                  <div className="grid size-8 shrink-0 place-items-center rounded-xl bg-teal/20 text-teal">
                    <item.icon className="size-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white">{item.title}</h4>
                    <p className="text-[11px] text-navy-foreground/70 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Footer Quote */}
            <div className="relative z-10 border-t border-white/10 pt-4">
              <p className="font-script text-xl text-gold">
                “{t("Local People, Brighter Tomorrow.", "ប្រជាជនមូលដ្ឋាន អនាគតភ្លឺស្វាង។")}”
              </p>
              <div className="mt-2 flex items-center justify-between text-xs text-navy-foreground/60">
                <span>© 2026 Cambodia Unlocked</span>
                <span className="flex items-center gap-1">
                  <MapPin className="size-3 text-gold" /> Siem Reap Pilot
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Interactive Login Form */}
          <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
            <div>
              {/* Header Title */}
              <div className="space-y-1">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src="/images/cambodia-unlocked-logo.jpg"
                    alt="Cambodia Unlocked"
                    className="size-12 rounded-2xl object-cover shadow-md ring-1 ring-border"
                  />
                  <div>
                    <span className="font-display text-lg font-extrabold text-navy">
                      Cambodia <span className="text-teal">Unlocked</span>
                    </span>
                    <p className="text-[11px] font-semibold text-gold">Siem Reap Tourism Pilot</p>
                  </div>
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest text-teal">
                  {t("Welcome Back", "សូមស្វាគមន៍ការត្រឡប់មកវិញ")}
                </p>
                <h1 className="font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl">
                  {t("Sign in to your account", "ចូលទៅកាន់គណនីរបស់អ្នក")}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {t(
                    "Select your role below to access your tailored dashboard.",
                    "ជ្រើសរើសតួនាទីរបស់អ្នកខាងក្រោម ដើម្បីចូលទៅកាន់ផ្ទាំងគ្រប់គ្រងផ្ទាល់ខ្លួន។"
                  )}
                </p>
              </div>

              {/* ROLE SELECTION TABS */}
              <div className="mt-6">
                <Label className="text-xs font-semibold text-navy">
                  {t("Choose Your Account Role (4 Roles) / ជ្រើសរើសតួនាទី", "ជ្រើសរើសតួនាទី (៤ តួនាទី)")}
                </Label>
                <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    {
                      id: "traveler" as UserRole,
                      label: t("Traveler", "ភ្ញៀវទេសចរ"),
                      icon: User,
                    },
                    {
                      id: "guide" as UserRole,
                      label: t("Tour Guide", "មគ្គុទ្ទេសក៍"),
                      icon: Compass,
                    },
                    {
                      id: "business" as UserRole,
                      label: t("Business", "ម្ចាស់អាជីវកម្ម"),
                      icon: Store,
                    },
                    {
                      id: "admin" as UserRole,
                      label: t("Admin", "អ្នកគ្រប់គ្រង"),
                      icon: ShieldCheck,
                    },
                  ].map((r) => {
                    const isSelected = role === r.id;
                    const Icon = r.icon;
                    return (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => handleRoleChange(r.id)}
                        className={`group relative flex flex-col items-center gap-1.5 rounded-2xl border p-2.5 text-center transition-all ${
                          isSelected
                            ? "border-teal bg-teal-soft text-teal shadow-sm ring-2 ring-teal/30"
                            : "border-border bg-card text-muted-foreground hover:border-teal/40 hover:text-navy"
                        }`}
                      >
                        <span
                          className={`grid size-9 place-items-center rounded-xl transition ${
                            isSelected
                              ? "bg-teal text-white shadow-sm"
                              : "bg-muted text-muted-foreground group-hover:bg-teal-soft group-hover:text-teal"
                          }`}
                        >
                          <Icon className="size-4" />
                        </span>
                        <span className="text-xs font-semibold">{r.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* QUICK ONE-CLICK DEMO ACCESS BAR */}
              <div className="mt-5 rounded-2xl border border-gold/40 bg-gold-soft/50 p-3">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-navy">
                    <Sparkles className="size-3.5 text-gold" />
                    {t("Instant 1-Click Demo Login (4 Roles)", "ចុចចូលសាកល្បងភ្លាមៗ (៤ តួនាទី)")}
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    {t("No password needed", "មិនបាច់វាយលេខសម្ងាត់")}
                  </span>
                </div>
                <div className="mt-2.5 grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => handleQuickDemo("traveler")}
                    className="h-8 rounded-full border-teal/40 bg-card text-xs font-medium text-navy hover:bg-teal hover:text-white"
                  >
                    <User className="mr-1 size-3 text-teal" />
                    {t("Traveler", "ភ្ញៀវទេសចរ")}
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => handleQuickDemo("guide")}
                    className="h-8 rounded-full border-emerald-500/50 bg-card text-xs font-medium text-navy hover:bg-emerald-600 hover:text-white"
                  >
                    <Compass className="mr-1 size-3 text-emerald-600" />
                    {t("Tour Guide", "មគ្គុទ្ទេសក៍")}
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => handleQuickDemo("business")}
                    className="h-8 rounded-full border-gold/50 bg-card text-xs font-medium text-navy hover:bg-gold hover:text-gold-foreground"
                  >
                    <Store className="mr-1 size-3 text-gold" />
                    {t("Business", "អាជីវកម្ម")}
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => handleQuickDemo("admin")}
                    className="h-8 rounded-full border-navy/40 bg-card text-xs font-medium text-navy hover:bg-navy hover:text-white"
                  >
                    <ShieldCheck className="mr-1 size-3 text-navy" />
                    {t("Admin", "Admin")}
                  </Button>
                </div>
              </div>

              {/* FORM FIELDS */}
              <form onSubmit={handleLogin} className="mt-5 space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs font-semibold text-navy">
                    {t("Email address", "អាសយដ្ឋានអ៊ីមែល")}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      required
                      value={email || DEMO_ACCOUNTS[role].email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="h-11 rounded-xl pl-9 text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-xs font-semibold text-navy">
                      {t("Password", "ពាក្យសម្ងាត់")}
                    </Label>
                    <button
                      type="button"
                      onClick={() =>
                        toast.info(
                          t(
                            "Demo notice",
                            "ព័ត៌មានគណនីសាកល្បង"
                          ),
                          {
                            description: t(
                              "In demo mode, you can use any password or click the instant 1-Click Demo buttons above.",
                              "ក្នុងការសាកល្បង អ្នកអាចវាយពាក្យសម្ងាត់ណាក៏បាន ឬចុចប៊ូតុងចូលភ្លាមៗខាងលើ។"
                            ),
                          }
                        )
                      }
                      className="text-xs font-medium text-teal hover:underline"
                    >
                      {t("Forgot password?", "ភ្លេចពាក្យសម្ងាត់?")}
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={password || "••••••••"}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="h-11 rounded-xl pl-9 pr-10 text-sm"
                    />
                    <button
                      type="button"
                      aria-label="Toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-navy"
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded border-border text-teal focus:ring-teal"
                    />
                    <span>{t("Remember this device", "ចងចាំឧបករណ៍នេះ")}</span>
                  </label>
                  <span className="text-teal font-medium">
                    {role === "business"
                      ? t("Business Dashboard", "ផ្ទាំងគ្រប់គ្រងអាជីវកម្ម")
                      : role === "admin"
                      ? t("Admin Control", "ផ្ទាំងគ្រប់គ្រង Admin")
                      : t("Traveler Hub", "ផ្ទាំងគ្រប់គ្រងអ្នកដំណើរ")}
                  </span>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="h-12 w-full rounded-full bg-teal text-base font-semibold text-primary-foreground shadow-md transition hover:bg-teal/95 hover:shadow-lg"
                >
                  {isLoading ? (
                    t("Signing in...", "កំពុងចូល...")
                  ) : (
                    <span className="inline-flex items-center gap-2">
                      {t("Sign In to Dashboard", "ចូលទៅកាន់ផ្ទាំងគ្រប់គ្រង")}
                      <ArrowRight className="size-4" />
                    </span>
                  )}
                </Button>
              </form>
            </div>

            {/* Sign Up Redirect Footer */}
            <div className="mt-8 border-t border-border pt-4 text-center">
              <p className="text-sm text-muted-foreground">
                {t("Don't have an account yet?", "តើអ្នកមិនទាន់មានគណនីមែនទេ?")}{" "}
                <Link
                  to="/signup"
                  className="font-semibold text-teal hover:underline inline-flex items-center gap-1"
                >
                  {t("Sign Up now", "ចុះឈ្មោះឥឡូវនេះ")}
                  <ChevronRight className="size-3.5" />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
