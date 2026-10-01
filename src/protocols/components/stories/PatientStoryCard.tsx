import { Img } from "@/components/ui/Img";
import type { PatientStory } from "@/content/stories";
import { PlayIcon, TrendDownIcon, ValueArrowIcon } from "@/components/home/results-icons";

/** Patient result card: name, age, condition, video thumbnail, before → after metric and summary. */
export function PatientStoryCard({ story }: { story: PatientStory }) {
  const { metric } = story;
  const unit = metric.unit ? <div>{metric.unit}</div> : null;
  return (
    <div className="flex h-full flex-col items-start justify-start gap-[1.13rem] rounded-[1.75rem] border border-white/20 bg-[linear-gradient(#0000000d,#0000000d),linear-gradient(#2f387f,#2f387f)] p-5 md:bg-black/5 md:bg-none">
      <div className="flex w-full flex-wrap items-start justify-between gap-3">
        <div className="flex flex-row items-start justify-start gap-2">
          <div className="self-end text-[0.88rem] font-medium text-slate-100 lg:text-[0.9rem]">{story.name}</div>
          {story.age != null && (
            <div className="flex items-center justify-start gap-[0.31rem]">
              <div className="text-base font-medium text-white/60">{story.age}</div>
              <div className="text-base font-medium text-white/60">yrs</div>
            </div>
          )}
        </div>
        {story.conditionTag && (
          <div className="flex max-h-[1.19rem] min-h-[1.19rem] items-center justify-center overflow-hidden rounded-[0.75rem] bg-[linear-gradient(#fff3,#fff3),linear-gradient(#2f387f,#2f387f)] px-[0.63rem] text-[0.63rem] leading-[1.5]">
            {story.conditionTag}
          </div>
        )}
      </div>

      <div className="relative aspect-[3/2] w-full md:aspect-auto">
        {story.thumbnail && (
          <Img
            src={story.thumbnail.src}
            alt={story.thumbnail.alt}
            width={384}
            height={256}
            sizes="(max-width: 991px) 22rem, 24rem"
            className="aspect-[3/2] h-full max-h-64 w-full min-w-full rounded-[0.25rem] object-cover object-[50%_40%] md:h-auto md:max-h-none"
          />
        )}
        {story.videoUrl && (
          <a
            href={story.videoUrl}
            target="_blank"
            rel="noopener"
            aria-label={`Play ${story.name}'s story`}
            className="absolute right-[0.63rem] bottom-[0.63rem] flex items-center justify-start gap-1 rounded-[3.81rem] border border-gray-300 bg-[#20202033] px-3 py-2 backdrop-blur-[10px]"
          >
            <PlayIcon className="size-[1.875rem]" />
            <div className="text-base font-medium">Play</div>
          </a>
        )}
      </div>

      {metric.label && (
        <div className="flex min-h-11 w-full items-center justify-between gap-3 rounded-[0.5rem] bg-[linear-gradient(#0003,#0003),linear-gradient(#2f387f,#2f387f)] p-2">
          <div className="flex-1">{metric.label}</div>
          <div className="min-h-7 w-[0.06rem] min-w-[0.06rem] bg-navy-500" />
          <div className="flex items-center justify-between gap-[0.88rem]">
            <div className="flex max-h-7 min-h-7 min-w-[3.06rem] items-center justify-start gap-1 rounded-[0.44rem] bg-rust px-[0.38rem] py-[0.53rem] font-medium max-xs:text-[0.75rem]">
              <div>{metric.before}</div>
              {unit}
            </div>
            <ValueArrowIcon className="size-4 text-teal-400" />
            <div className="flex max-h-7 min-h-7 min-w-[3.06rem] items-center justify-start gap-1 rounded-[0.44rem] bg-[linear-gradient(#0000001a,#0000001a),linear-gradient(#63c5b8,#63c5b8)] p-[0.38rem] text-[0.75rem] font-medium xs:text-[0.875rem]">
              <div>{metric.after}</div>
              {unit}
              <TrendDownIcon className="size-4 min-h-4 min-w-4" />
            </div>
          </div>
        </div>
      )}

      {story.summary && <div className="text-base text-balance text-slate-100">{story.summary}</div>}
    </div>
  );
}
