"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Image from "next/image";

type ResponseState = "yes" | "no" | null;

type Step = {
  title: string;
  messages: string[];
};

const YES_GIF_URL =
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMHJ0M2l0dmQyMGw5cXRxZzlmZ3V2M2hoanljcnRjeGJxZDk0c2tlMCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ytu2GUYbvhz7zShGwS/giphy.gif";

const STEPS: Step[] = [
  {
    title: "Hey Debby",
    messages: [
      "I know i should have done this earlier. Work’s been a lot lately with a lot of unplanned activities **I have a wonderful boss lol**, and I’ve had my head down.",
      "But I didn’t want to let the moment pass without saying something properly.",
      "You never left my mind, even the days we did not talk much.(there have been a lot of that lately, I apologize for that)",
    ],
  },
  {
    title: "This is what I want to say",
    messages: [
      "You have a way of making heavy days feel lighter even though you are carring something heavier **I actually appreciate that you trust me enough to let me in even though you are going through your own stuff silently.**",
      "I like how you show up (even though I dont make it easy sometimes). Calm, real, and present(You are really good at this one, its amazing how you can be there for someone).",
      "I love that you are so thoughtful and intentional. It’s rare to find someone who cares about people the way you do, and even rarer to find someone who can make me feel the way you make me feel.",
    ],
  },
  {
    title: "So here’s where I am right now",
    messages: [
      "I don’t want to keep this as vague, casual or generic even",
      "I Really like you, I know I have already told you, but I can't say it enough and I am going to be more intentional about it",
      "I want to be more intentional about us.",
    ],
  },
  {
    title: "One question",
    messages: [
      "Debby, will you be my valentine?",
      "No pressure, but the 'no' button doesn't work, you can try if you want, but it won't do anything :)",
      "If it’s a yes, I’ll make sure you feel chosen, as much as I can, maybe not the immediate days coming because, whew, the economy is rough right now and not everything worked out the way I expected it.",
    ],
  },
];

const pageFade = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.25 } },
};

const itemFade = {
  initial: { opacity: 0, y: 10 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, delay: 0.08 * i },
  }),
};

// Helper to render text with *asterisk* styling
const renderAsteriskText = (text: string) => {
  const parts = text.split(/(\*[^*]+\*)/);
  return parts.map((part, i) => {
    if (part.startsWith("*") && part.endsWith("*")) {
      const content = part.slice(1, -1);
      return (
        <span key={i} className="text-gray-500 text-xs">
          {content}
        </span>
      );
    }
    return part;
  });
};

export default function Home() {
  const [step, setStep] = React.useState<number>(0);
  const [response, setResponse] = React.useState<ResponseState>(null);
  const [noDialogOpen, setNoDialogOpen] = React.useState<boolean>(false);

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  const reset = () => {
    setStep(0);
    setResponse(null);
    setNoDialogOpen(false);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-pink-200 text-foreground">
      {/* soft animated backdrop */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-pink-300/50 blur-3xl" />
        <div className="absolute -bottom-28 -right-28 h-96 w-96 rounded-full bg-rose-300/50 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/10" />
      </motion.div>

      <div className="relative mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-5 py-10">
        {/* headline */}
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-pink-950">
            [Picture of you and I together]
          </h1>

          <p className="mt-2 text-xs text-pink-950/70">
            <strong>
              we legit dont have a photo together, we need to correct this asap
            </strong>
          </p>
        </motion.div>

        <div className="w-full space-y-5">
          {/* Top bar */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-pink-950/70">
              {response ? "Response" : `Step ${step + 1} of ${STEPS.length}`}
            </div>

            {!response && (
              <div className="flex items-center gap-2">
                {STEPS.map((_, i) => (
                  <div
                    key={i}
                    className={[
                      "h-1.5 rounded-full transition-all",
                      i === step ? "w-10 bg-pink-950/80" : "w-2 bg-pink-950/20",
                    ].join(" ")}
                  />
                ))}
              </div>
            )}
          </div>

          <AnimatePresence mode="wait">
            {response ? (
              <motion.div
                key={`resp-${response}`}
                variants={pageFade}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-4"
              >
                {response === "yes" ? (
                  <Card className="border border-pink-950/15 bg-white/85 backdrop-blur shadow-sm">
                    <CardHeader className="space-y-2">
                      <CardTitle className="text-2xl tracking-tight text-pink-950">
                        Okay. I’m happy.
                      </CardTitle>
                      <p className="text-sm text-pink-950/70">
                        I won’t make this a one-day thing. I’ll show up
                        properly.
                      </p>
                    </CardHeader>

                    <CardContent className="space-y-4">
                 
                      <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.35 }}
                        className="overflow-hidden rounded-xl border border-pink-950/15 mx-40 bg-white/60"
                      >
                        <Image
                          src={YES_GIF_URL}
                          alt="celebration"
                          width={100}
                          height={512}
                          className=" w-full object-cover sm:h-72"
                          loading="lazy"
                        />
                      </motion.div>

                      <div className="rounded-lg border border-pink-950/15 bg-pink-50/60 p-4">
                        <p className="text-base leading-relaxed text-pink-950/90">
                          {renderAsteriskText(
                            "I'll plan something nice, it has been a while since we had a proper date *(Probably not this saturday though)*, and I want to make sure we do something that you would really enjoy. I'll make sure to put in the effort to make it special for you, because you deserve that and so much more.",
                          )}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="border border-pink-950/15 bg-white/85 backdrop-blur shadow-sm">
                    <CardHeader className="space-y-2">
                      <CardTitle className="text-2xl tracking-tight text-pink-950">
                        I hear you.
                      </CardTitle>
                      <p className="text-sm text-pink-950/70">
                        Thanks for being honest. No pressure from my side.
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="rounded-lg border border-pink-950/15 bg-pink-50/60 p-4">
                        <p className="text-base leading-relaxed text-pink-950/90">
                          I still meant what I said. If things ever change,
                          you’ll know where I stand.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="flex gap-3">
                  <Button
                    onClick={reset}
                    variant="secondary"
                    className="h-11 w-full bg-white/70 hover:bg-white/90"
                  >
                    Start over
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={`step-${step}`}
                variants={pageFade}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-4"
              >
                <Card className="border border-pink-950/15 bg-white/85 backdrop-blur shadow-sm overflow-hidden">
                  <div className="h-1 bg-pink-950/70" />

                  <CardHeader className="space-y-2">
                    <CardTitle className="text-3xl tracking-tight text-pink-950">
                      {current.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    {current.messages.map((m, i) => (
                      <motion.div
                        key={i}
                        variants={itemFade}
                        initial="initial"
                        animate="animate"
                        custom={i}
                        className="rounded-lg border border-pink-950/15 bg-white/60 p-4 text-base leading-relaxed text-pink-950/90"
                      >
                        {renderAsteriskText(m)}
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>

                {isLast ? (
                  <div className="flex gap-3">
                    <Button
                      onClick={() => setResponse("yes")}
                      className="h-12 flex-1 bg-pink-950 text-pink-50 hover:bg-pink-950/90"
                    >
                      Yes
                    </Button>

                    <Button
                      onClick={() => setNoDialogOpen(true)}
                      variant="outline"
                      className="h-12 flex-1 border-pink-950/30 bg-white/60 hover:bg-white/80"
                    >
                      No
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <Button
                      onClick={() =>
                        setStep((s) => Math.min(s + 1, STEPS.length - 1))
                      }
                      className="h-12 flex-1 bg-pink-950 text-pink-50 hover:bg-pink-950/90"
                    >
                      Continue <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>

                    {step > 0 && (
                      <Button
                        onClick={() => setStep((s) => Math.max(s - 1, 0))}
                        variant="outline"
                        className="h-12 border-pink-950/30 bg-white/60 hover:bg-white/80"
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                      </Button>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* "No" dialog */}
      <AlertDialog open={noDialogOpen} onOpenChange={setNoDialogOpen}>
        <AlertDialogContent className="border border-pink-950/15 bg-white/95 backdrop-blur">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-pink-950">
              so why did you try?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-pink-950/70">
              be honest. i’m listening.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <Button
              variant="secondary"
              className="bg-white/80 hover:bg-white"
              onClick={() => setNoDialogOpen(false)}
            >
              close
            </Button>

            <Button
              className="bg-pink-950 text-pink-50 hover:bg-pink-950/90"
              onClick={() => {
                setNoDialogOpen(false);
                setResponse("yes");
              }}
            >
              okay, yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
