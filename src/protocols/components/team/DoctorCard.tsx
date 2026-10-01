import { Img } from "@/components/ui/Img";
import type { Doctor } from "@/content/doctors";
import { RichText } from "@/components/ui/RichText";

/** Care team member: photo, name, role (serif italic) and qualifications. */
export function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <div className="flex min-w-[15.75rem] flex-col items-start justify-start gap-6 lg:min-w-[13.75rem]">
      {doctor.image && (
        <Img
          src={doctor.image.src}
          alt={doctor.image.alt || doctor.name}
          width={504}
          height={444}
          sizes="15.75rem"
          className="h-auto w-full object-cover"
        />
      )}
      <div className="flex w-full flex-col items-start justify-start gap-4">
        <h3 className="text-[1.25rem] leading-[1.2] font-medium tracking-heading text-balance text-slate-900">{doctor.name}</h3>
        {doctor.role && <div className="font-serif text-base leading-[1.5] text-navy-700 italic">{doctor.role}</div>}
        {doctor.description && <RichText html={doctor.description} className="text-[0.88rem] text-slate-600 xs:text-base" />}
      </div>
    </div>
  );
}
