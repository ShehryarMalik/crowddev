import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import './App.css';

type Stage = 'gathering' | 'voting' | 'accepted' | 'in-review' | 'forming' | 'active' | 'not-accepted' | 'inconclusive';
type Page = 'home' | 'explore' | 'projects' | 'how' | 'detail' | 'create';
type SuggestionStatus = 'under-review' | 'accepted' | 'deferred' | 'rejected';
type Feature = { id: string; title: string; description?: string; included: boolean };
type Suggestion = { id: string; title: string; description: string; author: string; supporters: number; status: SuggestionStatus };
type Proposal = {
  id: string;
  title: string;
  tagline: string;
  problem: string;
  vision: string;
  category: string;
  creator: string;
  stage: Stage;
  supporters: number;
  yesVotes: number;
  noVotes: number;
  daysLeft?: number;
  features: Feature[];
  suggestions: Suggestion[];
};

const starterProposals: Proposal[] = [
  {
    id: 'laidoff',
    title: 'LaidOff',
    tagline: "You shouldn't have to face a job loss alone.",
    problem: 'Looking for work can be isolating. Job boards help people find vacancies, but they rarely provide the peer support, practical help, and sense of community people need while navigating unemployment.',
    vision: 'Build a community where job seekers can connect, share useful leads, prepare for interviews, and help each other move forward. The product should be useful without requiring people to publicly expose sensitive details about their employment situation.',
    category: 'Community',
    creator: 'Community proposal',
    stage: 'gathering',
    supporters: 128,
    yesVotes: 0,
    noVotes: 0,
    features: [
      { id: 'laidoff-f1', title: 'Peer support groups', description: 'Small groups for people navigating similar job-search challenges.', included: true },
      { id: 'laidoff-f2', title: 'Community-shared job leads', description: 'Members share opportunities with context, not just copied links.', included: true },
      { id: 'laidoff-f3', title: 'Interview practice', description: 'People help each other prepare and practice for interviews.', included: true },
      { id: 'laidoff-f4', title: 'Skills and goals profile', description: 'A lightweight way to show what you do and what kind of role you seek.', included: true },
    ],
    suggestions: [
      { id: 'laidoff-s1', title: 'Anonymous support groups', description: 'Allow people to join conversations without making their job-search status public on their profile.', author: 'Community member', supporters: 23, status: 'under-review' },
      { id: 'laidoff-s2', title: 'Peer CV review sessions', description: 'Let members volunteer to review each other’s resumes and give constructive feedback.', author: 'Community member', supporters: 17, status: 'under-review' },
      { id: 'laidoff-s3', title: 'Weekly accountability check-ins', description: 'Optional check-ins to share goals, progress, and useful leads.', author: 'Community member', supporters: 9, status: 'accepted' },
    ],
  },
  {
    id: 'cozy-world',
    title: 'A cozy world we build together',
    tagline: 'A small, peaceful multiplayer world shaped by its players.',
    problem: 'Many online games revolve around competition, grinding, and constant progression. Some players want a welcoming place to decorate, explore, and spend time with other people without pressure.',
    vision: 'Create a cozy online world where players can personalize a little space, visit friends, collect things, and help shape the shared experience. The first version should focus on a few interactions done well.',
    category: 'Gaming',
    creator: 'Community proposal',
    stage: 'voting',
    supporters: 74,
    yesVotes: 38,
    noVotes: 7,
    daysLeft: 5,
    features: [
      { id: 'cozy-f1', title: 'Personal spaces', description: 'A small area each player can customize.', included: true },
      { id: 'cozy-f2', title: 'Visit friends', description: 'Invite others to explore and hang out together.', included: true },
      { id: 'cozy-f3', title: 'Shared community garden', description: 'A place players can gradually improve together.', included: false },
    ],
    suggestions: [
      { id: 'cozy-s1', title: 'Optional quiet mode', description: 'Give players a way to socialize without open chat or direct messages.', author: 'Community member', supporters: 18, status: 'under-review' },
    ],
  },
  {
    id: 'zen',
    title: 'Zen: a little corner of peace',
    tagline: 'A calm online space to unwind with other people.',
    problem: 'Online spaces often compete for attention with streaks, notifications, feeds, and performance metrics. Not every digital experience needs to demand constant engagement.',
    vision: 'Create a gentle shared digital garden where people can unwind, leave small notes, listen to ambient sounds, and enjoy quiet company without pressure to perform.',
    category: 'Wellbeing',
    creator: 'Community proposal',
    stage: 'gathering',
    supporters: 62,
    yesVotes: 0,
    noVotes: 0,
    features: [
      { id: 'zen-f1', title: 'Shared garden', description: 'A peaceful space visitors can return to.', included: true },
      { id: 'zen-f2', title: 'Leave a small note', description: 'Share a kind thought without starting a noisy thread.', included: true },
      { id: 'zen-f3', title: 'Optional ambient sounds', description: 'Simple soundscapes for relaxing.', included: false },
    ],
    suggestions: [],
  },
  {
    id: 'local-library',
    title: 'A local-first knowledge library',
    tagline: 'Keep your notes and links useful, organized, and yours.',
    problem: 'Personal knowledge tools can lock important information behind accounts, subscriptions, or internet access. People need a lightweight way to collect information that remains available locally.',
    vision: 'Build an open-source library for notes, links, and small ideas that works offline and makes it easy to export your data.',
    category: 'Developer tools',
    creator: 'Community proposal',
    stage: 'in-review',
    supporters: 89,
    yesVotes: 43,
    noVotes: 9,
    features: [
      { id: 'local-f1', title: 'Offline-first notes', description: 'Write and read without an active connection.', included: true },
      { id: 'local-f2', title: 'Export all data', description: 'Keep a portable copy of your personal library.', included: true },
      { id: 'local-f3', title: 'Link collections', description: 'Save and organize useful references.', included: true },
    ],
    suggestions: [],
  },
];

const stageLabels: Record<Stage, string> = {
  gathering: 'Gathering support',
  voting: 'Voting open',
  accepted: 'Accepted',
  'in-review': 'Under review',
  forming: 'Forming a team',
  active: 'In development',
  'not-accepted': 'Not accepted',
  inconclusive: 'Inconclusive',
};

const stageDescriptions: Record<Stage, string> = {
  gathering: 'The idea is open for people to discover and help shape before a formal vote.',
  voting: 'The proposal is in a defined voting period. The specification being voted on is fixed.',
  accepted: 'The community vote met the published acceptance rule. Project formation is not guaranteed yet.',
  'in-review': 'The proposal has been accepted and is waiting for admin review and a decision about project formation.',
  forming: 'The initial project lead and contributors are being organized.',
  active: 'The project is being developed openly by its contributors.',
  'not-accepted': 'The proposal did not meet the published acceptance rule.',
  inconclusive: 'The vote ended without enough participation to make a decision.',
};

function IdeaCover({ proposal, detail = false }: { proposal: Proposal; detail?: boolean }) {
  const mark = proposal.id === 'laidoff' ? '↗' : proposal.id === 'cozy-world' ? '✳' : proposal.id === 'zen' ? '☼' : proposal.id === 'local-library' ? '⌘' : '✳';
  const caption = proposal.id === 'laidoff' ? 'PEOPLE, NOT PLATFORMS' : proposal.id === 'cozy-world' ? 'A WORLD TO SHARE' : proposal.id === 'zen' ? 'MAKE ROOM TO BREATHE' : proposal.id === 'local-library' ? 'KEEP WHAT YOU KNOW' : 'WHAT COULD WE BUILD?';
  return (
    <div className={`idea-cover idea-cover-${proposal.id}${detail ? ' detail-cover' : ''}`} aria-hidden="true">
      <span className="idea-cover-label">COMMUNITY IDEA / {proposal.category.toUpperCase()}</span>
      <span className="idea-cover-mark">{mark}</span>
      <span className="idea-cover-caption">{caption}</span>
      <span className="idea-cover-shape idea-cover-shape-one" />
      <span className="idea-cover-shape idea-cover-shape-two" />
    </div>
  );
}

function stageClass(stage: Stage) {
  return `stage stage-${stage}`;
}

function App() {
  const [proposals, setProposals] = useState(starterProposals);
  const [page, setPage] = useState<Page>('home');
  const [selectedId, setSelectedId] = useState('laidoff');
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All ideas');
  const [stageFilter, setStageFilter] = useState('All stages');
  const [detailTab, setDetailTab] = useState<'overview' | 'suggestions' | 'activity'>('overview');
  const [notice, setNotice] = useState('');
  const [showSuggestForm, setShowSuggestForm] = useState(false);
  const [suggestionTitle, setSuggestionTitle] = useState('');
  const [suggestionDescription, setSuggestionDescription] = useState('');
  const [suggestionSupport, setSuggestionSupport] = useState<Record<string, boolean>>({});
  const [myVotes, setMyVotes] = useState<Record<string, 'yes' | 'no' | undefined>>({});
  const [supportById, setSupportById] = useState<Record<string, boolean>>({});
  const [formTitle, setFormTitle] = useState('');
  const [formTagline, setFormTagline] = useState('');
  const [formProblem, setFormProblem] = useState('');
  const [formVision, setFormVision] = useState('');
  const [formCategory, setFormCategory] = useState('Community');
  const [formFeatures, setFormFeatures] = useState('');

  const selected = proposals.find((item) => item.id === selectedId) ?? proposals[0];

  const visibleProposals = useMemo(() => {
    const q = search.trim().toLowerCase();
    return proposals.filter((proposal) => {
      const matchesText = !q || `${proposal.title} ${proposal.tagline} ${proposal.problem} ${proposal.category}`.toLowerCase().includes(q);
      const matchesCategory = categoryFilter === 'All ideas' || proposal.category === categoryFilter;
      const matchesStage = stageFilter === 'All stages' || stageLabels[proposal.stage] === stageFilter;
      return matchesText && matchesCategory && matchesStage;
    });
  }, [proposals, search, categoryFilter, stageFilter]);

  const openDetail = (id: string, tab: 'overview' | 'suggestions' | 'activity' = 'overview') => {
    setSelectedId(id);
    setDetailTab(tab);
    setPage('detail');
    setNotice('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigate = (nextPage: Page) => {
    setPage(nextPage);
    setNotice('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSupport = (id: string) => {
    const already = Boolean(supportById[id]);
    setSupportById((current) => ({ ...current, [id]: !already }));
    setProposals((current) => current.map((proposal) => proposal.id === id ? { ...proposal, supporters: Math.max(0, proposal.supporters + (already ? -1 : 1)) } : proposal));
    setNotice(already ? 'You removed your support in this preview.' : 'You are supporting this idea in the preview.');
  };

  const castVote = (id: string, choice: 'yes' | 'no') => {
    const previous = myVotes[id];
    setProposals((current) => current.map((proposal) => {
      if (proposal.id !== id || proposal.stage !== 'voting') return proposal;
      const updated = { ...proposal };
      if (previous === choice) updated[choice === 'yes' ? 'yesVotes' : 'noVotes'] -= 1;
      else {
        if (previous) updated[previous === 'yes' ? 'yesVotes' : 'noVotes'] -= 1;
        updated[choice === 'yes' ? 'yesVotes' : 'noVotes'] += 1;
      }
      return updated;
    }));
    setMyVotes((current) => ({ ...current, [id]: previous === choice ? undefined : choice }));
    setNotice('Your vote was updated in this preview. It is not saved to a server.');
  };

  const submitSuggestion = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const title = suggestionTitle.trim();
    const description = suggestionDescription.trim();
    if (!title || !description) return;
    const suggestion: Suggestion = {
      id: `suggestion-${Date.now()}`,
      title,
      description,
      author: 'You',
      supporters: 0,
      status: 'under-review',
    };
    setProposals((current) => current.map((proposal) => proposal.id === selected.id ? { ...proposal, suggestions: [suggestion, ...proposal.suggestions] } : proposal));
    setSuggestionTitle('');
    setSuggestionDescription('');
    setShowSuggestForm(false);
    setDetailTab('suggestions');
    setNotice('Suggestion added to this preview. The project owner would review it after sign-in and backend support are added.');
  };

  const submitProposal = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const title = formTitle.trim();
    const tagline = formTagline.trim();
    const problem = formProblem.trim();
    const vision = formVision.trim();
    if (!title || !tagline || !problem || !vision) return;
    const features = formFeatures.split('\n').map((line) => line.trim()).filter(Boolean).map((feature, index) => ({
      id: `feature-${Date.now()}-${index}`,
      title: feature,
      included: true,
    }));
    const proposal: Proposal = {
      id: `proposal-${Date.now()}`,
      title,
      tagline,
      problem,
      vision,
      category: formCategory,
      creator: 'You',
      stage: 'gathering',
      supporters: 0,
      yesVotes: 0,
      noVotes: 0,
      features,
      suggestions: [],
    };
    setProposals((current) => [proposal, ...current]);
    setSelectedId(proposal.id);
    setFormTitle('');
    setFormTagline('');
    setFormProblem('');
    setFormVision('');
    setFormCategory('Community');
    setFormFeatures('');
    setPage('detail');
    setDetailTab('overview');
    setNotice('Proposal created in this preview. It will not persist after refreshing the page.');
  };

  const supportSuggestion = (suggestionId: string) => {
    const already = Boolean(suggestionSupport[suggestionId]);
    setSuggestionSupport((current) => ({ ...current, [suggestionId]: !already }));
    setProposals((current) => current.map((proposal) => ({
      ...proposal,
      suggestions: proposal.suggestions.map((item) => item.id === suggestionId ? { ...item, supporters: Math.max(0, item.supporters + (already ? -1 : 1)) } : item),
    })));
  };

  const ideaCard = (proposal: Proposal) => {
    const hasSupported = Boolean(supportById[proposal.id]);
    return (
      <article className={`idea-card idea-card-${proposal.id}`} key={proposal.id}>
        <IdeaCover proposal={proposal} />
        <div className="idea-card-top">
          <span className={`category-symbol category-${proposal.category.toLowerCase().replace(/[^a-z]+/g, '-')}`}>{proposal.category === 'Gaming' ? '◈' : proposal.category === 'Community' ? '◎' : proposal.category === 'Wellbeing' ? '☼' : '⌘'}</span>
          <span className="category-label">{proposal.category}</span>
          <span className={stageClass(proposal.stage)}>{stageLabels[proposal.stage]}</span>
        </div>
        <button className="idea-title-link" onClick={() => openDetail(proposal.id)}>{proposal.title}</button>
        <p className="idea-tagline">{proposal.tagline}</p>
        <p className="idea-excerpt">{proposal.problem}</p>
        <div className="idea-card-bottom">
          <div className="support-summary"><span className="mini-people">◉</span><strong>{proposal.supporters}</strong><span>supporters</span></div>
          {proposal.stage === 'voting' && <span className="deadline-label">{proposal.daysLeft} days left</span>}
        </div>
        <div className="idea-card-actions">
          <button className="button button-outline" onClick={() => openDetail(proposal.id)}>Explore idea <span aria-hidden="true">↗</span></button>
          {proposal.stage === 'gathering' && <button className={`button ${hasSupported ? 'button-supported' : 'button-soft'}`} onClick={() => toggleSupport(proposal.id)}>{hasSupported ? '✓ Supporting' : '+ Support idea'}</button>}
          {proposal.stage === 'voting' && <button className="button button-soft" onClick={() => openDetail(proposal.id)}>Cast your vote ↗</button>}
        </div>
      </article>
    );
  };

  return (
    <div className="site-shell">
      <div className="preview-ribbon"><span className="preview-dot" /> Early preview · Sample content and interactions · Nothing is saved to a server yet</div>
      <header className="site-header">
        <button className="brand" onClick={() => navigate('home')} aria-label="CrowdDev home">
          <span className="brand-icon">c<span>.</span></span><span className="brand-name">crowddev</span>
        </button>
        <nav className="main-nav" aria-label="Main navigation">
          <button className={page === 'explore' ? 'nav-link active' : 'nav-link'} onClick={() => navigate('explore')}>Explore ideas</button>
          <button className={page === 'projects' ? 'nav-link active' : 'nav-link'} onClick={() => navigate('projects')}>Projects</button>
          <button className={page === 'how' ? 'nav-link active' : 'nav-link'} onClick={() => navigate('how')}>How it works</button>
        </nav>
        <div className="header-actions">
          <button className="button button-primary header-cta" onClick={() => navigate('create')}>Propose an idea <span aria-hidden="true">↗</span></button>
        </div>
      </header>

      {notice && <div className="global-notice" role="status"><span>ⓘ</span><p>{notice}</p><button onClick={() => setNotice('')} aria-label="Dismiss notice">×</button></div>}

      <main>
        {page === 'home' && (
          <>
            <section className="home-hero page-width">
              <div className="hero-copy">
                <div className="eyebrow"><span className="eyebrow-line" /> COMMUNITY-DRIVEN OPEN SOURCE</div>
                <h1>Good ideas deserve<br />a <em>community.</em></h1>
                <p className="hero-description">CrowdDev brings people together to shape ideas, decide what deserves to be built, and help open-source projects find their first supporters and contributors.</p>
                <div className="hero-actions">
                  <button className="button button-primary button-large" onClick={() => navigate('explore')}>Explore ideas <span aria-hidden="true">↗</span></button>
                  <button className="button button-text button-large" onClick={() => navigate('how')}>See how it works <span aria-hidden="true">→</span></button>
                </div>
                <div className="hero-note"><span className="note-check">✓</span> You don't need to be a developer to help shape what gets built.</div>
              </div>
              <div className="journey-card" aria-label="How an idea moves forward">
                <div className="journey-card-heading"><span className="journey-kicker">FROM IDEA TO OPEN SOURCE</span><span className="journey-spark">✳</span></div>
                <div className="journey-visual">
                  <div className="journey-line" />
                  <div className="journey-step"><span className="journey-number">01</span><div className="journey-symbol">✳</div><div><strong>Shape an idea</strong><small>Start with a problem worth solving.</small></div></div>
                  <div className="journey-step"><span className="journey-number">02</span><div className="journey-symbol lavender">◎</div><div><strong>Find your people</strong><small>Build interest and gather feedback.</small></div></div>
                  <div className="journey-step"><span className="journey-number">03</span><div className="journey-symbol mint">⌘</div><div><strong>Decide together</strong><small>Vote on a defined proposal.</small></div></div>
                  <div className="journey-step"><span className="journey-number">04</span><div className="journey-symbol peach">↗</div><div><strong>Build in the open</strong><small>Organize contributors and move forward.</small></div></div>
                </div>
                <div className="journey-card-footer"><span className="footer-orbit">◌</span> Ideas are the beginning, not the finish line.</div>
              </div>
            </section>

            <section className="section-band">
              <div className="page-width intro-row">
                <div><div className="eyebrow">A DIFFERENT WAY TO START</div><h2>Don't build in a vacuum.</h2></div>
                <p>Find the people who care about an idea before the first release. Let them help shape the vision, share what they need, and show whether they're interested in seeing it exist.</p>
              </div>
            </section>

            <section className="page-width ideas-section home-ideas">
              <div className="section-heading"><div><div className="eyebrow">IDEAS SEEKING THEIR PEOPLE</div><h2>What could we build?</h2><p>Explore community proposals and help shape what comes next.</p></div><button className="text-link" onClick={() => navigate('explore')}>Explore all ideas <span>→</span></button></div>
              <div className="idea-grid">{proposals.slice(0, 3).map(ideaCard)}</div>
              <div className="center-action"><button className="button button-outline" onClick={() => navigate('explore')}>See all ideas <span>→</span></button></div>
            </section>

            <section className="page-width callout-section">
              <div className="callout-mark">+</div><div><div className="eyebrow">HAVE SOMETHING IN MIND?</div><h2>Start with the idea.</h2><p>Describe the problem, sketch your vision, and invite people to help make it better.</p></div><button className="button button-dark" onClick={() => navigate('create')}>Propose a project <span>↗</span></button>
            </section>
          </>
        )}

        {page === 'explore' && (
          <section className="page-width inner-page">
            <div className="page-intro"><div className="eyebrow"><span className="eyebrow-line" /> THE COMMUNITY IDEA BOARD</div><h1>Find an idea worth<br /><em>building together.</em></h1><p>Explore early ideas, help improve their direction, and support the projects you'd like to see exist.</p></div>
            <div className="explore-toolbar"><label className="search-field"><span>⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search ideas, problems, or categories…" aria-label="Search proposals" /></label><label className="select-field"><span className="sr-only">Category</span><select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}><option>All ideas</option><option>Community</option><option>Gaming</option><option>Wellbeing</option><option>Developer tools</option></select></label><label className="select-field"><span className="sr-only">Stage</span><select value={stageFilter} onChange={(event) => setStageFilter(event.target.value)}><option>All stages</option>{Object.values(stageLabels).map((label) => <option key={label}>{label}</option>)}</select></label></div>
            <div className="results-heading"><span><strong>{visibleProposals.length}</strong> ideas</span><span>Sample proposals for preview</span></div>
            {visibleProposals.length ? <div className="idea-grid">{visibleProposals.map(ideaCard)}</div> : <div className="empty-state"><span className="empty-icon">⌕</span><h3>No ideas found</h3><p>Try another search or remove a filter.</p><button className="button button-outline" onClick={() => { setSearch(''); setCategoryFilter('All ideas'); setStageFilter('All stages'); }}>Clear filters</button></div>}
          </section>
        )}

        {page === 'projects' && (
          <section className="page-width inner-page">
            <div className="page-intro"><div className="eyebrow"><span className="eyebrow-line" /> BEYOND THE VOTE</div><h1>Ideas can become<br /><em>open-source projects.</em></h1><p>When a proposal is accepted, CrowdDev's first release uses an admin-managed process to review it and organize a project lead. This area will show projects that have started formation or development.</p></div>
            <div className="projects-stage-strip"><div><span className="stage-dot dot-purple" /><strong>Accepted</strong><small>Decision recorded</small></div><span className="strip-arrow">→</span><div><span className="stage-dot dot-orange" /><strong>In formation</strong><small>Lead and contributors organized</small></div><span className="strip-arrow">→</span><div><span className="stage-dot dot-green" /><strong>In development</strong><small>Building in the open</small></div></div>
            <div className="section-heading project-list-heading"><div><h2>Projects taking shape</h2><p>These are illustrative preview records, not active real-world projects.</p></div></div>
            <div className="idea-grid">{proposals.filter((proposal) => ['accepted', 'in-review', 'forming', 'active'].includes(proposal.stage)).map(ideaCard)}</div>
            <div className="plain-note"><strong>Our V1 promise:</strong> acceptance is a community decision, not a guarantee that a project will be built. Admins review accepted ideas and coordinate project formation.</div>
          </section>
        )}

        {page === 'how' && (
          <section className="page-width inner-page how-page">
            <div className="page-intro"><div className="eyebrow"><span className="eyebrow-line" /> HOW CROWDDEV WORKS</div><h1>From a small idea to<br /><em>a shared effort.</em></h1><p>You can be part of a project's story before writing a single line of code. CrowdDev is designed to connect ideas with the people who care about them.</p></div>
            <div className="how-grid">
              {[
                { n: '01', title: 'Propose an idea', desc: 'Describe the problem, your vision, and the first features you imagine. An idea can start small.' },
                { n: '02', title: 'Shape it together', desc: 'People suggest features and improvements. The idea owner reviews suggestions and maintains the official specification.' },
                { n: '03', title: 'Make a decision', desc: 'When the proposal is ready, a defined voting period lets the community decide whether it should move forward.' },
                { n: '04', title: 'Organize the next step', desc: 'Accepted proposals enter admin review. A project lead and initial contributors can be organized when there is a credible path forward.' },
                { n: '05', title: 'Build in the open', desc: 'The long-term goal is to connect projects to repositories, contributors, and transparent community maintenance.' },
              ].map((step) => <article className="how-step-card" key={step.n}><span className="how-number">{step.n}</span><h2>{step.title}</h2><p>{step.desc}</p></article>)}
            </div>
            <div className="how-footnote"><span>✳</span><p><strong>You don't have to be a developer.</strong> You can help by identifying a problem, suggesting a useful feature, voting, testing a release, writing documentation, or contributing code when you're ready.</p></div>
            <div className="center-action"><button className="button button-primary button-large" onClick={() => navigate('explore')}>Explore ideas <span>↗</span></button></div>
          </section>
        )}

        {page === 'detail' && selected && (
          <section className="page-width detail-page">
            <button className="back-link" onClick={() => navigate('explore')}>← Back to ideas</button>
            <IdeaCover proposal={selected} detail />
            <div className="detail-layout">
              <div className="detail-main">
                <div className="detail-topline"><span className={`category-symbol category-${selected.category.toLowerCase().replace(/[^a-z]+/g, '-')}`}>{selected.category === 'Gaming' ? '◈' : selected.category === 'Community' ? '◎' : selected.category === 'Wellbeing' ? '☼' : '⌘'}</span><span className="category-label">{selected.category}</span><span className={stageClass(selected.stage)}>{stageLabels[selected.stage]}</span></div>
                <h1 className="detail-title">{selected.title}</h1><p className="detail-tagline">{selected.tagline}</p>
                <div className="detail-byline"><span className="owner-avatar">{selected.creator === 'You' ? 'Y' : selected.title.slice(0, 1)}</span><span>Proposed by <strong>{selected.creator}</strong></span><span className="byline-dot">·</span><span>Community proposal preview</span></div>
                <div className="detail-tabs" role="tablist" aria-label="Idea details"><button className={detailTab === 'overview' ? 'detail-tab selected' : 'detail-tab'} onClick={() => setDetailTab('overview')} role="tab" aria-selected={detailTab === 'overview'}>Overview <span>01</span></button><button className={detailTab === 'suggestions' ? 'detail-tab selected' : 'detail-tab'} onClick={() => setDetailTab('suggestions')} role="tab" aria-selected={detailTab === 'suggestions'}>Suggestions <span>{selected.suggestions.length.toString().padStart(2, '0')}</span></button><button className={detailTab === 'activity' ? 'detail-tab selected' : 'detail-tab'} onClick={() => setDetailTab('activity')} role="tab" aria-selected={detailTab === 'activity'}>History</button></div>

                {detailTab === 'overview' && <div className="detail-content">
                  <section className="spec-section"><div className="section-eyebrow">01 / THE PROBLEM</div><h2>Why this idea matters</h2><p>{selected.problem}</p></section>
                  <section className="spec-section"><div className="section-eyebrow">02 / THE VISION</div><h2>What we're imagining</h2><p>{selected.vision}</p></section>
                  <section className="spec-section"><div className="section-heading-inline"><div><div className="section-eyebrow">03 / INITIAL SPECIFICATION</div><h2>First features</h2></div><span className="muted-count">{selected.features.length} items</span></div><p className="section-caption">A starting point to discuss, not a final or unchangeable product plan.</p>
                    <div className="feature-list">{selected.features.map((feature, index) => <article className="feature-row" key={feature.id}><span className={feature.included ? 'feature-number included' : 'feature-number'}>{feature.included ? '✓' : String(index + 1).padStart(2, '0')}</span><div><h3>{feature.title}</h3>{feature.description && <p>{feature.description}</p>}</div><span className={feature.included ? 'feature-state' : 'feature-state proposed'}>{feature.included ? 'In proposal' : 'To discuss'}</span></article>)}</div>
                  </section>
                  <section className="spec-section"><div className="section-heading-inline"><div><div className="section-eyebrow">04 / COMMUNITY INPUT</div><h2>Help shape the idea</h2></div><button className="text-link" onClick={() => setDetailTab('suggestions')}>All suggestions →</button></div><p>Have an improvement in mind? Submit a suggestion with the problem it solves. The idea owner or an admin reviews it before it becomes part of the official specification.</p><button className="button button-outline" onClick={() => { setDetailTab('suggestions'); setShowSuggestForm(true); }}>＋ Suggest a feature</button></section>
                </div>}

                {detailTab === 'suggestions' && <div className="detail-content suggestions-content"><div className="suggestion-intro"><div><div className="section-eyebrow">COMMUNITY CONTRIBUTIONS</div><h2>Improve the idea.</h2><p>Suggestions don't change the official specification automatically. The idea owner or an admin reviews each one.</p></div><button className="button button-primary" onClick={() => setShowSuggestForm((current) => !current)}>{showSuggestForm ? 'Cancel' : '+ Suggest a feature'}</button></div>
                  {showSuggestForm && <form className="suggestion-form" onSubmit={submitSuggestion}><label>Suggestion title<input value={suggestionTitle} onChange={(event) => setSuggestionTitle(event.target.value)} placeholder="What should be added or improved?" maxLength={100} required /></label><label>What would it do, and why does it matter?<textarea value={suggestionDescription} onChange={(event) => setSuggestionDescription(event.target.value)} rows={4} maxLength={800} placeholder="Describe the feature and the problem it solves…" required /></label><div className="form-footer"><span>{suggestionDescription.length}/800</span><button className="button button-primary" type="submit">Submit suggestion ↗</button></div><p className="form-footnote">Preview only: submitting will not notify an owner or save to a server yet.</p></form>}
                  {selected.suggestions.length === 0 ? <div className="empty-state compact"><span className="empty-icon">✳</span><h3>Start the conversation</h3><p>No suggestions yet. Share the first improvement you'd like to see.</p></div> : <div className="suggestion-list">{selected.suggestions.map((item) => <article className="suggestion-card" key={item.id}><div className="suggestion-card-heading"><span className="suggestion-bulb">✳</span><span className={`suggestion-status suggestion-${item.status}`}>{item.status === 'under-review' ? 'Under review' : item.status === 'accepted' ? 'Accepted into proposal' : item.status === 'deferred' ? 'Deferred' : 'Not accepted'}</span></div><h3>{item.title}</h3><p>{item.description}</p><div className="suggestion-card-footer"><span>Suggested by <strong>{item.author}</strong></span><button className={suggestionSupport[item.id] ? 'support-suggestion is-supported' : 'support-suggestion'} onClick={() => supportSuggestion(item.id)}>{suggestionSupport[item.id] ? '♥ Supported' : '♡ Support'} <strong>{item.supporters}</strong></button></div></article>)}</div>}
                </div>}

                {detailTab === 'activity' && <div className="detail-content history-content"><div className="section-eyebrow">TRANSPARENT HISTORY</div><h2>How this idea has evolved</h2><p>Changes to the proposal should be recorded so people can understand what changed and why. This preview uses sample entries; a real activity log will be connected to the database later.</p><div className="timeline"><div className="timeline-entry"><span className="timeline-marker"/><div><span className="timeline-date">Initial proposal</span><h3>Idea shared with the community</h3><p>The original vision and initial features were added to the page.</p></div></div><div className="timeline-entry"><span className="timeline-marker lavender"/><div><span className="timeline-date">Community input</span><h3>Suggestions began arriving</h3><p>People proposed possible improvements for the owner to review.</p></div></div></div></div>}
              </div>

              <aside className="detail-sidebar">
                <section className="decision-card"><div className="decision-card-top"><span className="section-eyebrow">CURRENT STAGE</span><span className={stageClass(selected.stage)}>{stageLabels[selected.stage]}</span></div><p>{stageDescriptions[selected.stage]}</p>
                  {selected.stage === 'voting' ? <><div className="vote-count-row"><span>Yes</span><strong>{selected.yesVotes}</strong></div><div className="vote-bar"><span style={{ width: `${(selected.yesVotes + selected.noVotes) ? (selected.yesVotes / (selected.yesVotes + selected.noVotes)) * 100 : 0}%` }} /></div><div className="vote-count-row muted"><span>No</span><strong>{selected.noVotes}</strong></div><p className="vote-small">{selected.daysLeft} days left · 7-day vote window</p><div className="vote-buttons"><button className={myVotes[selected.id] === 'yes' ? 'button button-supported' : 'button button-primary'} onClick={() => castVote(selected.id, 'yes')}>{myVotes[selected.id] === 'yes' ? '✓ Voted yes' : 'Vote yes'}</button><button className={myVotes[selected.id] === 'no' ? 'button button-no-selected' : 'button button-outline'} onClick={() => castVote(selected.id, 'no')}>{myVotes[selected.id] === 'no' ? '✓ Voted no' : 'Vote no'}</button></div><p className="small-legal">Preview vote only. Sign-in and server-side validation aren't connected yet.</p></> : selected.stage === 'gathering' ? <><div className="support-big"><strong>{selected.supporters}</strong><span>people support this idea</span></div><button className={supportById[selected.id] ? 'button button-supported button-full' : 'button button-primary button-full'} onClick={() => toggleSupport(selected.id)}>{supportById[selected.id] ? '✓ You support this idea' : 'Support this idea'} <span>↗</span></button><p className="small-legal">Support expresses interest. A formal vote happens later if the proposal is ready.</p></> : <div className="result-panel"><span className="result-check">✓</span><strong>{stageLabels[selected.stage]}</strong><p>{stageDescriptions[selected.stage]}</p></div>}
                </section>
                <section className="project-facts"><h3>At a glance</h3><div className="fact-row"><span>Category</span><strong>{selected.category}</strong></div><div className="fact-row"><span>Supporters</span><strong>{selected.supporters}</strong></div><div className="fact-row"><span>Features in proposal</span><strong>{selected.features.filter((feature) => feature.included).length}</strong></div><div className="fact-row"><span>Suggestions</span><strong>{selected.suggestions.length}</strong></div></section>
                <section className="sidebar-note"><span>✳</span><p><strong>Not a developer?</strong><br />You can still help by sharing a problem, suggesting a feature, voting, testing a release, or telling others who might care.</p></section>
              </aside>
            </div>
          </section>
        )}

        {page === 'create' && (
          <section className="page-width create-page">
            <button className="back-link" onClick={() => navigate('explore')}>← Back to ideas</button>
            <div className="create-layout"><div className="create-intro"><div className="eyebrow"><span className="eyebrow-line" /> START WITH THE PROBLEM</div><h1>Give your idea<br /><em>a place to grow.</em></h1><p>Explain what should exist and why it matters. People can help shape the feature list, share feedback, and eventually vote on a clearly defined proposal.</p><div className="create-tip"><span>✳</span><div><strong>Good proposals start with a real problem.</strong><p>You don't need every detail figured out. Give the community enough context to understand the idea and help improve it.</p></div></div></div>
              <form className="create-form" onSubmit={submitProposal}><div className="form-heading"><span className="form-step-label">NEW PROPOSAL · PREVIEW</span><h2>Describe your idea</h2><p>Fields marked with * are required.</p></div><label>Project name *<input value={formTitle} onChange={(event) => setFormTitle(event.target.value)} placeholder="e.g. LaidOff" maxLength={80} required /></label><label>One-line pitch *<input value={formTagline} onChange={(event) => setFormTagline(event.target.value)} placeholder="What makes this idea worth building?" maxLength={160} required /></label><label>Category *<select value={formCategory} onChange={(event) => setFormCategory(event.target.value)}><option>Community</option><option>Gaming</option><option>Wellbeing</option><option>Developer tools</option><option>Education</option><option>Other</option></select></label><label>What problem are you trying to solve? *<textarea value={formProblem} onChange={(event) => setFormProblem(event.target.value)} rows={4} maxLength={1400} placeholder="Who has this problem? Why does it matter? What do people do today?" required /></label><label>What's your vision for the solution? *<textarea value={formVision} onChange={(event) => setFormVision(event.target.value)} rows={4} maxLength={1400} placeholder="Describe the experience or outcome you'd like to create…" required /></label><label>Initial features <span className="optional-label">Optional · one per line</span><textarea value={formFeatures} onChange={(event) => setFormFeatures(event.target.value)} rows={4} maxLength={1000} placeholder={'Peer support groups\nCommunity-shared job leads\nInterview preparation'} /></label><div className="form-disclaimer"><span>ⓘ</span><p>This creates a local preview only. In the released product, proposals will require an account and remain editable while in draft. The specification will be locked when formal voting starts.</p></div><div className="create-form-actions"><button type="button" className="button button-outline" onClick={() => navigate('explore')}>Cancel</button><button type="submit" className="button button-primary button-large">Create preview proposal <span>↗</span></button></div></form>
            </div>
          </section>
        )}
      </main>

      <footer className="site-footer"><div className="page-width footer-inner"><button className="footer-brand" onClick={() => navigate('home')}><span className="brand-icon small">c<span>.</span></span> crowddev</button><p>Ideas find their people. People build together.</p><div className="footer-links"><button onClick={() => navigate('explore')}>Explore ideas</button><button onClick={() => navigate('how')}>How it works</button><button onClick={() => navigate('create')}>Propose an idea</button></div><span className="footer-preview">EARLY PREVIEW · SAMPLE DATA</span></div></footer>
    </div>
  );
}

export default App;
