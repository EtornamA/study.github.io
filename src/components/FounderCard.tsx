import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, GraduationCap, Award, MapPin, ExternalLink } from "lucide-react";

interface FounderCardProps {
  name: string;
  title: string;
  image: string;
  location: string;
  currentRole: string;
  currentCompany: string;
  education: string;
  educationDetails: string;
  keyAchievements: string[];
  skills: string[];
  linkedinUrl?: string;
}

export function FounderCard({
  name,
  title,
  image,
  location,
  currentRole,
  currentCompany,
  education,
  educationDetails,
  keyAchievements,
  skills,
  linkedinUrl,
}: FounderCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative h-full min-h-[400px] sm:min-h-[500px]"
      onClick={() => setIsFlipped(!isFlipped)}
      style={{ perspective: "1000px" }}
    >
      <div
        className="relative w-full h-full transition-transform duration-700 cursor-pointer"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front Side */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <Card className="h-full p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border-2 border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all duration-300 text-center">
            <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-xl sm:rounded-2xl overflow-hidden mx-auto mb-4 sm:mb-6 ring-2 sm:ring-4 ring-primary/10 shadow-lg">
              <img 
                src={image}
                alt={name} 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">{name}</h3>
            <p className="text-sm sm:text-base text-primary font-medium mb-1">{title}</p>
            <p className="text-xs sm:text-sm text-muted-foreground">{location}</p>
            <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground">Tap to learn more</p>
            </div>
          </Card>
        </div>

        {/* Back Side */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <Card className="h-full p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 border-primary/50 bg-card shadow-lg overflow-y-auto">
            <div className="space-y-3 sm:space-y-4">
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1">{name}</h3>
                <p className="text-sm sm:text-base text-primary font-medium">{title}</p>
              </div>

              <div className="flex items-start gap-2 text-xs sm:text-sm">
                <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">{currentRole}</p>
                  <p className="text-muted-foreground text-xs">{currentCompany}</p>
                </div>
              </div>

              <div className="flex items-start gap-2 text-xs sm:text-sm">
                <GraduationCap className="w-3 h-3 sm:w-4 sm:h-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">{education}</p>
                  <p className="text-muted-foreground text-xs leading-relaxed">{educationDetails}</p>
                </div>
              </div>

              <div className="flex items-start gap-2 text-xs sm:text-sm">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground">{location}</p>
              </div>

              {keyAchievements.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                    <p className="font-semibold text-xs sm:text-sm">Key Achievements</p>
                  </div>
                  <ul className="space-y-1 text-xs text-muted-foreground ml-5 sm:ml-6">
                    {keyAchievements.map((achievement, idx) => (
                      <li key={idx} className="list-disc leading-relaxed">{achievement}</li>
                    ))}
                  </ul>
                </div>
              )}

              {skills.length > 0 && (
                <div>
                  <p className="font-semibold text-xs sm:text-sm mb-2">Skills</p>
                  <div className="flex flex-wrap gap-1 sm:gap-1.5">
                    {skills.slice(0, 6).map((skill, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs px-1.5 py-0.5">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {linkedinUrl && (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm text-primary hover:underline mt-3 sm:mt-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                  View LinkedIn Profile
                </a>
              )}

              <p className="text-xs text-muted-foreground text-center pt-2 border-t border-border">
                Tap to flip back
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

