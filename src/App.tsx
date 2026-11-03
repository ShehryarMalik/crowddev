import { useMemo, useState, type FormEvent } from 'react';
import './App.css';

type Choice = 'yes' | 'no';
type Filter = 'All ideas' | 'Open' | 'Closing soon' | 'Decided';

type Proposal = {
  id: number;
  title: string;
  description: string;
  category: string;
  author: string;
  avatar: string;
  yes: number;
  no: number;
  daysLeft: number;
  status: 'open' | 'accepted' | 'rejected';
};

const initialProposals: Proposal[] = [
  {
    id: 1,
    title: 'A cozy multiplayer world owned by its community',
    description:
      'A small, peaceful online world where people can decorate homes, visit friends, collect things, and create a place together without endless grinding.',
    category: 'Gaming',
    author: 'Alex Morgan',
    avatar: 'A',
    yes: 38,
    no: 7,
    daysLeft: 5,
    status: 'open',
  },
  {
    id: 2,
    title: 'LaidOff — a community for people navigating job loss',
    description:
      'A place for people looking for work to connect, share genuine job leads, practice interviews, and help each other get back on their feet.',
    category: 'Community',
    author: 'Sam Rivera',
    avatar: 'S',
    yes: 52,
    no: 4,
    daysLeft: 2,
    status: 'open',
  },
  {
    id: 3,
    title: 'A quieter corner of the internet',
    description:
      'A simple digital garden where people can unwind together. No streaks, follower counts, algorithmic feeds, or pressure to perform.',
    category: 'Wellbeing',
    author: 'Jamie Chen',
    avatar: 'J',
    yes: 26,
    no: 11,
    daysLeft: 7,
    status: 'open',
  },
  {
    id: 4,
    title: 'A local-first personal knowledge library',
    description:
      'A lightweight, open-source app for collecting notes, links, and ideas that remain yours and work without an internet connection.',
    category: 'Developer tools',
    author: 'Taylor Reed',
    avatar: 'T',
    yes: 71,
    no: 8,
    daysLeft: 0,
    status: 'accepted',
  },
];

const filters: Filter[] = ['All ideas', 'Open', 'Closing soon', 'Decided'];

function App() {
  const [proposals, setProposals] = useState(initialProposals);
  const [votes, setVotes] = useState<Record<number, Choice | undefined>>({});
  const [activeFilter, setActiveFilter] = useState<Filter>('All ideas');
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Developer tools');
  const [notice, setNotice] = useState('');

  const visibleProposals = useMemo(() => {
    const query = search.toLowerCase().trim();

    return proposals.filter((proposal) => {
      const matchesSearch =
        !query ||
        `${proposal.title} ${proposal.description} ${proposal.category} ${proposal.author}`
          .toLowerCase()
          .includes(query);

      const matchesFilter =
        activeFilter === 'All ideas' ||
        (activeFilter === 'Open' && proposal.status === 'open') ||
        (activeFilter === 'Closing soon' &&
          proposal.status === 'open' &&
          proposal.daysLeft <= 2) ||
        (activeFilter === 'Decided' && proposal.status !== 'open');

      return matchesSearch && matchesFilter;
    });
  }, [proposals, search, activeFilter]);

  const totalVotes = proposals.reduce((sum, p) => sum + p.yes + p.no, 0);

  function castVote(id: number, choice: Choice) {
    const previous = votes[id];

    setProposals((current) =>
      current.map((proposal) => {
        if (proposal.id !== id || proposal.status !== 'open') {
          return proposal;
        }

        const updated = { ...proposal };

        if (previous === choice) {
          updated[choice] -= 1;
        } else {
          if (previous) updated[previous] -= 1;
          updated[choice] += 1;
        }

        return updated;
      }),
    );

    setVotes((current) => ({
      ...current,
      [id]: previous === choice ? undefined : choice,
    }));
    setNotice('Vote updated in this preview.');
  }

  function submitProposal(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle || !trimmedDescription) return;

    const proposal: Proposal = {
      id: Date.now(),
      title: trimmedTitle,
      description: trimmedDescription,
      category,
      author: 'You',
      avatar: 'Y',
      yes: 0,
      no: 0,
      daysLeft: 7,
      status: 'open',
    };

    setProposals((current) => [proposal, ...current]);
    setActiveFilter('All ideas');
    setSearch('');
    setTitle('');
    setDescription('');
    setShowForm(false);
    setNotice('Proposal added to this preview. It has not been published online.');
  }

  function changeFilter(filter: Filter) {
    setActiveFilter(filter);
    setNotice('');
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#" aria-label="CrowdDev home">
          <span className="brand-mark">c<span>.</span></span>
          <span>CrowdDev</span>
        </a>

        <label className="top-search">
          <span aria-hidden="true">⌕</span>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search ideas..."
            aria-label="Search ideas"
          />
          <kbd>/</kbd>
        </label>

        <div className="topbar-actions">
          <button className="button button-primary button-small" onClick={() => setShowForm(true)}>
            <span>＋</span> Propose an idea
          </button>
          <div className="profile-avatar" title="Preview profile">Y</div>
        </div>
      </header>

      <div className="layout">
        <aside className="sidebar">
          <p className="sidebar-label">DISCOVER</p>
          <button className="nav-item nav-item-active" onClick={() => changeFilter('All ideas')}>
            <span className="nav-icon">◫</span> Explore ideas
          </button>
          <button className="nav-item" onClick={() => changeFilter('Open')}>
            <span className="nav-icon">◉</span> Open for voting
          </button>
          <button className="nav-item" onClick={() => changeFilter('Closing soon')}>
            <span className="nav-icon">◷</span> Closing soon
          </button>
          <button className="nav-item" onClick={() => changeFilter('Decided')}>
            <span className="nav-icon">✓</span> Decided
          </button>

          <div className="sidebar-divider" />
          <p className="sidebar-label">YOUR SPACE</p>
          <button className="nav-item" onClick={() => setNotice('Sign-in will be available when we connect authentication.')}>
            <span className="nav-icon">♡</span> Your votes
          </button>
          <button className="nav-item" onClick={() => setNotice('Your profile will be available when we connect authentication.')}>
            <span className="nav-icon">♙</span> Your proposals
          </button>

          <div className="sidebar-callout">
            <span className="callout-spark">✳</span>
            <h3>Good ideas need people.</h3>
            <p>Help decide what deserves to be built next.</p>
            <button onClick={() => setShowForm(true)}>Share an idea <span>↗</span></button>
          </div>

          <div className="sidebar-bottom">
            <span className="online-dot" />
            Community-powered building
          </div>
        </aside>

        <main className="main-content">
          <div className="eyebrow"><span /> COMMUNITY PROPOSALS</div>
          <section className="hero">
            <h1>What should we<br /><span>build together?</span></h1>
            <p>
              A community for ideas worth building. Propose something, make your
              voice heard, and help decide what comes next.
            </p>
            <button className="button button-dark" onClick={() => setShowForm(true)}>
              Propose an idea <span>↗</span>
            </button>
          </section>

          <section className="feed-section">
            <div className="feed-heading">
              <div>
                <h2>Explore ideas</h2>
                <p>Good things start with a conversation.</p>
              </div>
              <span className="idea-count">{proposals.length} proposals</span>
            </div>

            <div className="filter-row">
              {filters.map((filter) => (
                <button
                  key={filter}
                  className={`filter-chip ${activeFilter === filter ? 'filter-chip-active' : ''}`}
                  onClick={() => changeFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>

            {notice && (
              <div className="notice" role="status">
                <span>ⓘ</span> {notice}
                <button aria-label="Dismiss notice" onClick={() => setNotice('')}>×</button>
              </div>
            )}

            <div className="proposal-list">
              {visibleProposals.map((proposal, index) => {
                const selected = votes[proposal.id];
                const decided = proposal.status !== 'open';
                const total = proposal.yes + proposal.no;
                const yesPercentage = total ? Math.round((proposal.yes / total) * 100) : 0;

                return (
                  <article className="proposal-card" key={proposal.id}>
                    <div className="proposal-card-top">
                      <span className={`category-icon category-${index % 4}`}>
                        {['✳', '↗', '☼', '⌘'][index % 4]}
                      </span>
                      <span className="category-name">{proposal.category}</span>
                      <span className={`status-pill ${decided ? 'status-decided' : 'status-open'}`}>
                        <span /> {proposal.status === 'open'
                          ? 'Voting open'
                          : proposal.status === 'accepted'
                            ? 'Accepted'
                            : 'Not accepted'}
                      </span>
                      <button
                        className="more-button"
                        aria-label={`More options for ${proposal.title}`}
                        onClick={() => setNotice('More proposal options will be added in a later version.')}
                      >
                        ···
                      </button>
                    </div>

                    <h3>{proposal.title}</h3>
                    <p className="proposal-description">{proposal.description}</p>

                    <div className="proposal-meta">
                      <span className="author-avatar">{proposal.avatar}</span>
                      <span>Proposed by <strong>{proposal.author}</strong></span>
                      <span className="meta-separator">·</span>
                      <span>{decided ? 'Voting ended' : `${proposal.daysLeft} days left`}</span>
                    </div>

                    <div className="proposal-footer">
                      <div className="vote-summary">
                        <div className="vote-progress">
                          <span style={{ width: `${yesPercentage}%` }} />
                        </div>
                        <strong>{proposal.yes} yes</strong>
                        <span className="vote-no">{proposal.no} no</span>
                        <span className="vote-total">{total} votes</span>
                      </div>

                      {!decided ? (
                        <div className="vote-actions">
                          <button
                            className={`vote-button vote-yes ${selected === 'yes' ? 'vote-selected' : ''}`}
                            onClick={() => castVote(proposal.id, 'yes')}
                            aria-pressed={selected === 'yes'}
                          >
                            <span>↑</span> Yes
                          </button>
                          <button
                            className={`vote-button vote-no-button ${selected === 'no' ? 'vote-selected-no' : ''}`}
                            onClick={() => castVote(proposal.id, 'no')}
                            aria-pressed={selected === 'no'}
                          >
                            <span>↓</span> No
                          </button>
                        </div>
                      ) : (
                        <span className="result-label">{yesPercentage}% voted yes</span>
                      )}
                    </div>
                  </article>
                );
              })}

              {visibleProposals.length === 0 && (
                <div className="empty-state">
                  <span>⌕</span>
                  <h3>No proposals found</h3>
                  <p>Try another search, or be the first to suggest something new.</p>
                  <button className="button button-primary" onClick={() => setShowForm(true)}>
                    Submit an idea
                  </button>
                </div>
              )}
            </div>

            <p className="preview-disclaimer">
              <span>✳</span> Preview mode · Votes and proposals are temporary and are not saved to a server yet.
            </p>
          </section>
        </main>

        <aside className="rightbar">
          <section className="welcome-card">
            <span className="welcome-icon">✳</span>
            <p className="mini-label">WELCOME TO CROWDDEV</p>
            <h2>Big things start small.</h2>
            <p>One idea. A few votes. A community deciding what comes next.</p>
            <button onClick={() => setShowForm(true)}>Add your idea <span>↗</span></button>
          </section>

          <section className="stats-card">
            <h3>Community pulse</h3>
            <p className="stats-caption">A little momentum goes a long way.</p>
            <div className="stat-line">
              <span><span className="stat-dot stat-dot-purple" /> Proposals</span>
              <strong>{proposals.length}</strong>
            </div>
            <div className="stat-line">
              <span><span className="stat-dot stat-dot-green" /> Votes cast</span>
              <strong>{totalVotes}</strong>
            </div>
            <div className="stat-line">
              <span><span className="stat-dot stat-dot-orange" /> Ideas accepted</span>
              <strong>{proposals.filter((p) => p.status === 'accepted').length}</strong>
            </div>
          </section>

          <section className="how-card">
            <h3>How it works</h3>
            <div className="how-step">
              <span>01</span>
              <div><strong>Propose</strong><p>Share an idea worth building.</p></div>
            </div>
            <div className="how-step">
              <span>02</span>
              <div><strong>Vote</strong><p>Support the ideas you believe in.</p></div>
            </div>
            <div className="how-step">
              <span>03</span>
              <div><strong>Decide</strong><p>See where the community stands.</p></div>
            </div>
          </section>

          <div className="right-footer">
            <span>Made for people who build</span>
            <span>About · Guidelines · GitHub</span>
          </div>
        </aside>
      </div>

      {showForm && (
        <div className="modal-backdrop" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setShowForm(false);
        }}>
          <section className="proposal-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <div className="modal-heading">
              <div>
                <p className="eyebrow"><span /> YOUR IDEA, YOUR MOVE</p>
                <h2 id="modal-title">Propose something</h2>
                <p>What would you like the community to help decide?</p>
              </div>
              <button className="modal-close" aria-label="Close" onClick={() => setShowForm(false)}>×</button>
            </div>
            <form onSubmit={submitProposal}>
              <label>
                Idea title
                <input
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="What should we build?"
                  maxLength={100}
                  required
                />
              </label>
              <label>
                Category
                <select value={category} onChange={(event) => setCategory(event.target.value)}>
                  <option>Developer tools</option>
                  <option>Gaming</option>
                  <option>Community</option>
                  <option>Wellbeing</option>
                  <option>Open source</option>
                  <option>Other</option>
                </select>
              </label>
              <label>
                What is the idea?
                <textarea
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Describe the problem and what you'd like to see built..."
                  rows={4}
                  maxLength={600}
                  required
                />
                <span className="field-hint">{description.length}/600 characters</span>
              </label>
              <div className="modal-note">
                <span>ⓘ</span>
                This preview saves the proposal only in the current browser session.
              </div>
              <div className="modal-actions">
                <button type="button" className="button button-light" onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" className="button button-primary">Add proposal <span>↗</span></button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;