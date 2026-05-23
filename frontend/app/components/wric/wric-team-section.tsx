import Image from "next/image";
import { boardMembers as staticBoard, emeritiMembers as staticEmeriti, staffMembers as staticStaff } from "@/app/data/wric-team";
import type { StaffMember, BoardMember } from "@/app/data/wric-team";

type Props = {
  staffMembers?: StaffMember[]
  boardMembers?: BoardMember[]
  emeritiMembers?: BoardMember[]
}

export function WricTeamSection({staffMembers = staticStaff, boardMembers = staticBoard, emeritiMembers = staticEmeriti}: Props = {}) {
  const featuredStaff = staffMembers.filter((member) => member.featured);
  const remainingStaff = staffMembers.filter((member) => !member.featured);

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
            <article className="team-feature-card" key={member.email ?? member.name}>
              {member.image ? (
                <div className="team-feature-image">
                  <Image alt={member.name} fill sizes="(min-width: 900px) 20vw, 50vw" src={member.image} />
                </div>
              ) : null}
              <div>
                <h3>{member.name}</h3>
                <p>{member.title}</p>
                {member.email ? <a href={`mailto:${member.email}`}>{member.email}</a> : null}
              </div>
            </article>
          ))}
        </div>

        <div className="team-directory-grid">
          <section className="staff-directory" aria-labelledby="staff-title">
            <div className="team-panel-head">
              <span className="kicker">Staff</span>
              <h3 id="staff-title">Program leaders & support team</h3>
            </div>
            <div className="staff-list">
              {remainingStaff.map((member) => (
                <article className="staff-row" key={member.email ?? member.name}>
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
                    <h4>{member.name}</h4>
                    <p>{member.title}</p>
                    {member.email ? <a href={`mailto:${member.email}`}>{member.email}</a> : null}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="board-directory" aria-labelledby="board-title">
            <div className="team-panel-head">
              <span className="kicker">Board of Trustees</span>
              <h3 id="board-title">Governance & guidance</h3>
            </div>
            <div className="board-list">
              {boardMembers.map((member) => (
                <article className="board-chip" key={member.name}>
                  <strong>{member.name}</strong>
                  {member.role ? <span>{member.role}</span> : null}
                </article>
              ))}
            </div>

            <div className="emeriti-list">
              <span className="kicker">Emeriti & Founder</span>
              {emeritiMembers.map((member) => (
                <article className="board-chip" key={member.name}>
                  <strong>{member.name}</strong>
                  {member.role ? <span>{member.role}</span> : null}
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
