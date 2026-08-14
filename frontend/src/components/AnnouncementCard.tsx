import type { Announcement } from '../types';
import { formatDate, initials } from '../utils/format';

export function AnnouncementCard({ announcement }: { announcement: Announcement }) {
  return (
    <article className="announcement-card">
      <div className="announcement-meta">
        <span className="avatar avatar-light">{initials(announcement.author.name)}</span>
        <div><strong>{announcement.author.name}</strong><time dateTime={announcement.createdAt}>{formatDate(announcement.createdAt, true)}</time></div>
      </div>
      <div className="announcement-copy"><span className="content-label">ANUNCIO</span><h3>{announcement.title}</h3><p>{announcement.content}</p></div>
    </article>
  );
}
