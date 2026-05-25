import Image from "next/image";
import { dataAttr } from "@/sanity/lib/utils";
import { boardMembers as staticBoard, emeritiMembers as staticEmeriti, staffMembers as staticStaff } from "@/app/data/wric-team";
import type { StaffMember, BoardMember } from "@/app/data/wric-team";

type SanityStaff = {
  _id: string
  name: string
  title?: string | null
  email?: string | null
  featured?: boolean | null
  image?: string | null
}

type SanityBoard = {
  _id: string
  name: string
  role?: string | null
  isEmeritus?: boolean | null
}

type Props = {
  staffMembers?: StaffMember[]
  boardMembers?: BoardMember[]
  emeritiMembers?: BoardMember[]
  sanityStaff?: SanityStaff[]
  sanityBoard?: SanityBoard[]
}

export function WricTeamSection({
  staffMembers,
  boardMembers,
  emeritiMembers,
  sanityStaff = [],
  sanityBoard = [],
}: Props = {}) {
  // Use Sanity data when available, fall back to static
  const usesSanity = sanityStaff.length > 0

  const allStaff: (StaffMember & {_id?: string})[] = usesSanity
    ? sanityStaff.map(s => ({
        _id: s._id,
        name: s.name,
        title: s.title ?? '',
        email: s.email ?? undefined,
        image: s.image ?? undefined,
        featured: s.featured ?? false,
      }))
    : (staffMembers ?? staticStaff)

  const allBoard: (BoardMember & {_id?: string})[] = sanityBoard.length > 0
    ? sanityBoard.filter(m => !m.isEmeritus).map(m => ({_id: m._id, name: m.name, role: m.role ?? undefined}))
    : (boardMembers ?? staticBoard)

  const allEmeriti: (BoardMember & {_id?: string})[] = sanityBoard.length > 0
    ? sanityBoard.filter(m => m.isEmeritus).map(m => ({_id: m._id, name: m.name, role: m.role ?? undefined}))
    : (emeritiMembers ?? staticEmeriti)

  const featuredStaff = allStaff.filter((member) => (member as StaffMember).featured);
  const remainingStaff = allStaff.filter((member) => !(member as StaffMember).featured);

  return (
    <section className="team-section" id="team" aria-labelledby="team-title">
      <div className="wrap">
        <div className="section-head">
          <div className="left">
            <span className="kicker">Who we are</span>
            <h2 className="display h2" id="team-title">
              The people behind the work.
            </h2>
          </div>
          <div className="right">
            <p>
              WRIC is powered by advocates, counselors, case managers, attorneys,
              volunteers, and trustees working together to help people move toward
              safety, independence, and dignity.
            </p>
          </div>
        </div>

        <div className="team-feature-grid">
          {featuredStaff.map((member) => (
            <article className="team-feature-card" key={(member as StaffMember).email ?? member.name}>
              {member.image ? (
                <div className="team-feature-image">
                  <Image alt={member.name} fill sizes="(min-width: 900px) 20vw, 50vw" src={member.image} />
                </div>
              ) : null}
              <div>
                <h3
                  {...((member as {_id?: string})._id ? {
                    'data-sanity': dataAttr({id: (member as {_id: string})._id, type: 'wricStaffMember', path: 'name'}).toString()
                  } : {})}
                >
                  {member.name}
                </h3>
                <p
                  {...((member as {_id?: string})._id ? {
                    'data-sanity': dataAttr({id: (member as {_id: string})._id, type: 'wricStaffMember', path: 'title'}).toString()
                  } : {})}
                >
                  {member.title}
                </p>
                {(member as StaffMember).email ? <a href={`mailto:${(member as StaffMember).email}`}>{(member as StaffMember).email}</a> : null}
              </div>
            </article>
          ))}
        </div>

        <div className="team-directory-grid">
          <section className="staff-directory" aria-labelledby="staff-title">
            <div className="team-panel-head">
              <span className="kicker">Staff</span>
              <h3 id="staff-title">Program leaders &amp; support team</h3>
            </div>
            <div className="staff-list">
              {remainingStaff.map((member) => (
                <article className="staff-row" key={(member as StaffMember).email ?? member.name}>
                  {member.image ? (
                    <div className="staff-avatar">
                      <Image alt="" fill sizes="56px" src={member.image} />
                    </div>
                  ) : (
                    <div className="staff-avatar staff-avatar-fallback" aria-hidden="true">
                      {member.name
                        .split(" ")
                        .slice(0, 2)
                        .map((part) => part[0])
                        .join("")}
                    </div>
                  )}
                  <div>
                    <h4
                      {...((member as {_id?: string})._id ? {
                        'data-sanity': dataAttr({id: (member as {_id: string})._id, type: 'wricStaffMember', path: 'name'}).toString()
                      } : {})}
                    >
                      {member.name}
                    </h4>
                    <p
                      {...((member as {_id?: string})._id ? {
                        'data-sanity': dataAttr({id: (member as {_id: string})._id, type: 'wricStaffMember', path: 'title'}).toString()
                      } : {})}
                    >
                      {member.title}
                    </p>
                    {(member as StaffMember).email ? <a href={`mailto:${(member as StaffMember).email}`}>{(member as StaffMember).email}</a> : null}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="board-directory" aria-labelledby="board-title">
            <div className="team-panel-head">
              <span className="kicker">Board of Trustees</span>
              <h3 id="board-title">Governance &amp; guidance</h3>
            </div>
            <div className="board-list">
              {allBoard.map((member) => (
                <article className="board-chip" key={member.name}>
                  <strong
                    {...((member as {_id?: string})._id ? {
                      'data-sanity': dataAttr({id: (member as {_id: string})._id, type: 'wricBoardMember', path: 'name'}).toString()
                    } : {})}
                  >
                    {member.name}
                  </strong>
                  {member.role ? (
                    <span
                      {...((member as {_id?: string})._id ? {
                        'data-sanity': dataAttr({id: (member as {_id: string})._id, type: 'wricBoardMember', path: 'role'}).toString()
                      } : {})}
                    >
                      {member.role}
                    </span>
                  ) : null}
                </article>
              ))}
            </div>

            <div className="emeriti-list">
              <span className="kicker">Emeriti &amp; Founder</span>
              {allEmeriti.map((member) => (
                <article className="board-chip" key={member.name}>
                  <strong
                    {...((member as {_id?: string})._id ? {
                      'data-sanity': dataAttr({id: (member as {_id: string})._id, type: 'wricBoardMember', path: 'name'}).toString()
                    } : {})}
                  >
                    {member.name}
                  </strong>
                  {member.role ? (
                    <span
                      {...((member as {_id?: string})._id ? {
                        'data-sanity': dataAttr({id: (member as {_id: string})._id, type: 'wricBoardMember', path: 'role'}).toString()
                      } : {})}
                    >
                      {member.role}
                    </span>
                  ) : null}
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
