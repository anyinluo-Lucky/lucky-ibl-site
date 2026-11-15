const portfolioSections = {
  photography: {
    title: 'Photography & Visual Production',
    intro: 'Portraits, motorsport, commercial edits and 3D motion studies.',
    groups: [
      ['Photography', 'photography', ['Motorsport in motion', 'Beach portrait series', 'Seaside portrait', 'Portrait in red', 'Cathedral at dusk']],
      ['Video Editing & Post-production', 'video-editing', ['Behind the scenes', 'Product video', 'Promotion guide', 'Mercedes-Benz test drive']],
      ['3D & Motion Design', 'motion-3d', ['Lighting study', 'Building growth', 'Aircraft animation']]
    ],
    techniques: 'Selected work shows motion blur, portrait framing and 3D lighting. Cinema 4D was used for the animation examples.'
  },
  drone: {
    title: 'Drone & VR',
    intro: 'Aerial and overhead perspectives, alongside experience producing property photography, drone panoramas and VR assets at KE Holdings.',
    groups: [
      ['Selected aerial and overhead work', 'drone-vr', ['IFC from above', 'Coastal viewpoints', 'Pool from above', 'Breaking wave', 'Tianhe City from above', 'Canton Tower at night']]
    ],
    techniques: 'Top-down composition, urban geometry and coastal viewpoints.'
  },
  iot: {
    title: 'Programming & IoT',
    intro: 'Two lab prototypes for monitoring physical conditions and making readings visible.',
    projects: [
      {
        title: 'Water Infrastructure Condition Monitoring',
        id: 'water-monitoring',
        short: 'Water Monitoring',
        summary: 'Reliable monitoring and recovery after network interruption.',
        evidence: [['water-dashboard', 'Site A dashboard · live ultrasonic input restored'], ['water-replay', 'Supabase recovery record · one replayed invalid reading'], ['water-architecture', 'Final report diagram · event flow and recovery']],
        details: [
          ['Challenge', 'Monitor level readings and keep event records during a network interruption.'],
          ['My contribution', 'Defined the problem, reviewed evidence, compared technologies and coordinated and edited the team report.'],
          ['Technical approach', 'A Raspberry Pi and Grove ultrasonic sensor supplied real Site A readings. Site B was simulated. Node-RED displayed local readings. The team wrote events to a persistent SQLite outbox during outages and retried them with their original IDs after reconnection to Supabase.'],
          ['Result', 'In the live Pi lab run, a queued Site A event matched its Supabase row after reconnection. It was an invalid 525 cm reading, not a valid empty-tank value. Earlier Mac tests used simulated inputs. A paper target represented the water surface.']
        ],
        flow: ['Grove ultrasonic sensor', 'Raspberry Pi · Node-RED', 'SQLite outbox', 'Supabase'],
        note: 'Node-RED also feeds the local dashboard. Site B uses simulated input.'
      },
      {
        title: 'Smart Room Safety Monitoring',
        id: 'smart-room',
        short: 'Smart Room',
        summary: 'Sensor monitoring and bidirectional device control with ACK feedback.',
        evidence: [['smart-dashboard', 'Dashboard · live device and Identify ACK']],
        details: [
          ['Challenge', 'Make room telemetry and device status visible, with feedback when settings change.'],
          ['Team implementation', 'Our team built and tested the sensing, gateway and dashboard system.'],
          ['Technical approach', 'Browser commands go through Flask, MQTT, the Raspberry Pi gateway and UART to the Pico W. The Pico returns an ACK through the reverse path, and the dashboard shows it.'],
          ['Result', 'The dashboard displayed live telemetry and a successful settings acknowledgement during testing. Testing covered malformed messages, button events, device identification and data persistence after a web-app restart.']
        ],
        flow: ['Browser', 'Flask', 'MQTT', 'Raspberry Pi gateway', 'UART', 'Pico W'],
        note: 'The ACK returns along the reverse path. Telemetry resumed after the tested broker outage, but a full gateway queue can drop old messages.'
      }
    ],
  },
  marketing: {
    title: 'Marketing & Sales',
    workflow: [
      ['Understand Needs', 'Clarify the audience and what the client needs.', 'M4 5h16v11H10l-5 4v-4H4z M8 9h8 M8 12h5'],
      ['Plan', 'Agree on deliverables, timing and responsibilities.', 'M5 5h14v15H5z M8 3v4 M16 3v4 M8 11h8 M8 15h5'],
      ['Execute', 'Coordinate production and keep delivery on track.', 'M4 8l8-4 8 4v9l-8 4-8-4z M4 8l8 4 8-4 M12 12v9'],
      ['Improve', 'Review feedback and refine the next delivery.', 'M19 10a7 7 0 1 0 0 5 M19 5v5h-5']
    ],
    cards: [
      ['XCAR — Automotive Advertising', 'Worked with automotive brands and dealership marketing teams to understand client needs and coordinate digital advertising campaigns.'],
      ['ByteDance — Cross-Market Content Operations', 'Coordinated content production and delivery for TikTok Shop campaigns across the US, UK and Saudi Arabia.']
    ]
  },
  teamwork: {
    title: 'Communication & Teamwork',
    cards: [
      ['Qing Mu · Production coordination', 'Led a five-person short-video team, planned production schedules and trained junior staff.'],
      ['BIG W · Customer communication', 'Help customers with purchases and enquiries and work with colleagues on daily store operations.'],
      ['LTSA · Student activities', 'Help organise Bendigo student activities, coordinate with local businesses and communicate event details to students.']
    ]
  },
  ai: {
    title: 'AI Tools & Exploration',
    cards: [
      ['Creative production', 'Used digital avatars, AI copywriting and automated voice-over tools in short-video production at ByteDance.'],
      ['Collaboration with R&D', 'Supplied scripts and visual assets to support internal teams improving AI video tools.']
    ]
  },
  making: {
    title: 'Making & Tools',
    cards: [
      ['Studio equipment', 'Managed studio equipment and documented production procedures at ByteDance.'],
      ['Hardware setup and testing', 'Connected Grove sensors and Raspberry Pi hardware, checked inputs and tested device behaviour under normal and abnormal conditions.']
    ]
  },
  climbing: {
    title: 'Climbing & Exploration',
    photo: {
      title: 'Lucky bouldering on an indoor climbing wall',
      preview: 'media/climbing.jpg',
      source: 'media/climbing.jpg'
    }
  },
  meet: {
    title: 'Meet Lucky',
    intro: 'I’m Juancan Luo (Lucky), a Master of Information Technology student at La Trobe University in Bendigo. My work connects business, creative production and hands-on technology.',
    cards: [
      ['Business & marketing', 'I worked with automotive clients at XCAR to coordinate digital campaigns and produce promotional content.'],
      ['Creative production', 'I produced property photography and VR assets at KE Holdings and led a short-video production team at Qing Mu.'],
      ['AI tools & technology', 'At ByteDance, I combined studio production with AI video workflows and collaboration with R&D.'],
      ['Programming & IoT', 'At La Trobe, I apply software and hardware skills to practical monitoring projects.']
    ]
  }
};

const portfolioContent = document.querySelector('#portfolio-content');
const mediaViewer = document.querySelector('#media-viewer');
const viewerBody = mediaViewer.querySelector('.viewer-body');
const viewerTitle = mediaViewer.querySelector('h2');
let mediaTrigger;
let mediaPanelScroll = 0;

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function openMedia(item, trigger) {
  mediaTrigger = trigger;
  mediaPanelScroll = document.querySelector('#skill-panel').scrollTop;
  viewerTitle.textContent = item.title;
  const media = element(item.video ? 'video' : 'img');
  if (item.video) {
    media.controls = true;
    media.playsInline = true;
    media.poster = item.preview;
    media.preload = 'metadata';
  } else {
    media.alt = item.title;
  }
  media.src = item.source;
  viewerBody.replaceChildren(media);
  mediaViewer.showModal();
}

mediaViewer.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  event.preventDefault();
  event.stopPropagation();
  mediaViewer.close();
});
mediaViewer.querySelector('button').onclick = () => mediaViewer.close();
mediaViewer.addEventListener('click', event => {
  if (event.target === mediaViewer) mediaViewer.close();
});
mediaViewer.addEventListener('close', () => {
  viewerBody.replaceChildren();
  if (mediaTrigger?.isConnected) {
    mediaTrigger.focus({preventScroll: true});
    document.querySelector('#skill-panel').scrollTo(0, mediaPanelScroll);
  }
});

function galleryGroup([heading, folder, titles]) {
  const section = element('section', 'media-group');
  const grid = element('div', 'media-grid');
  if (folder === 'drone-vr' || folder === 'photography') grid.classList.add('editorial-grid');
  section.append(element('h3', '', heading), grid);
  portfolioMedia[folder].forEach(([name, preview], index) => {
    const item = {
      title: titles[index],
      preview,
      source: 'media/' + encodeURIComponent(name),
      video: name.endsWith('.mp4')
    };
    const button = element('button', 'media-card');
    button.type = 'button';
    button.setAttribute('aria-haspopup', 'dialog');
    button.setAttribute('aria-label', (item.video ? 'Play ' : 'View full image: ') + item.title);
    const image = element('img');
    image.loading = 'lazy';
    image.src = preview;
    image.alt = item.title;
    const caption = element('span', 'media-caption', item.title);
    caption.append(element('span', 'media-action', item.video ? 'Play video' : 'View full image'));
    button.append(image, caption);
    button.onclick = () => openMedia(item, button);
    grid.append(button);
  });
  return section;
}

function evidenceCard(source, title) {
  const button = element('button', 'media-card');
  button.type = 'button';
  button.setAttribute('aria-haspopup', 'dialog');
  const image = element('img');
  image.src = source;
  image.alt = '';
  button.append(image, element('span', 'media-caption', title));
  button.onclick = () => openMedia({source, title}, button);
  return button;
}

function projectNavigation(projects) {
  const nav = element('nav', 'iot-jump');
  nav.setAttribute('aria-label', 'IoT projects');
  for (const project of projects) {
    const link = element('a', 'experience-card', project.short);
    link.href = '#' + project.id;
    link.append(element('span', '', project.summary));
    link.onclick = event => {
      event.preventDefault();
      const target = document.getElementById(project.id);
      const panel = document.querySelector('#skill-panel');
      const header = panel.querySelector('.panel-header');
      panel.scrollTo(0, panel.scrollTop + target.getBoundingClientRect().top - header.getBoundingClientRect().bottom - 8);
      target.focus({preventScroll: true});
    };
    nav.append(link);
  }
  return nav;
}

function projectSection(project) {
  const section = element('section', 'technical-project');
  section.id = project.id;
  section.tabIndex = -1;
  section.append(element('h3', '', project.title));
  const details = element('dl');
  for (const [term, value] of project.details) {
    const row = element('div');
    row.append(element('dt', '', term), element('dd', '', value));
    details.append(row);
  }
  const figure = element('figure', 'architecture');
  const flow = element('ol', 'architecture-flow');
  for (const node of project.flow) flow.append(element('li', '', node));
  figure.append(element('figcaption', '', 'Explanatory architecture diagram'), flow, element('p', '', project.note));
  section.append(details, figure);
  const evidence = element('div', 'media-grid iot-evidence');
  for (const [file, title] of project.evidence) {
    evidence.append(evidenceCard('iot-evidence/' + file + '.png', title));
  }
  if (project.id === 'smart-room') evidence.prepend(evidenceCard('media/smart-room-hardware.jpg', 'Smart Room wired prototype'));
  section.append(evidence);
  return section;
}

function marketingWorkflow(steps) {
  const figure = element('figure', 'marketing-workflow');
  const caption = element('figcaption', '', 'An illustration of how I approach work');
  const flow = element('ol', 'marketing-flow');
  for (const [label, description, path] of steps) {
    const step = element('li', 'marketing-step');
    const icon = element('span', 'workflow-icon');
    icon.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="${path}"/></svg>`;
    step.append(icon, element('strong', '', label), element('p', '', description));
    flow.append(step);
  }
  figure.append(caption, flow);
  return figure;
}

function climbingFeature(photo) {
  const feature = element('div', 'climbing-feature');
  const button = element('button', 'media-card climbing-photo');
  button.type = 'button';
  button.setAttribute('aria-haspopup', 'dialog');
  const image = element('img');
  image.src = photo.preview;
  image.alt = photo.title;
  button.append(image, element('span', 'media-caption media-action', 'View full photograph'));
  button.onclick = () => openMedia(photo, button);
  const copy = element('div', 'climbing-copy');
  copy.append(
    element('h3', '', 'Climbing keeps me focused.'),
    element('p', 'panel-intro', 'Every route presents a different challenge. I enjoy analysing the moves, adjusting my approach and trying again.')
  );
  feature.append(button, copy);
  return feature;
}

function renderPortfolio(skill) {
  const section = portfolioSections[skill];
  portfolioContent.replaceChildren();
  if (section.intro) portfolioContent.append(element('p', 'panel-intro', section.intro));
  if (section.projects) portfolioContent.append(projectNavigation(section.projects), ...section.projects.map(projectSection));
  if (skill === 'meet') {
    const link = element('button', 'iot-meet-link', 'View Programming & IoT');
    link.type = 'button';
    link.onclick = () => { select(props.findIndex(([id]) => id === 'iot')); openPanel(document.querySelector('#meet-lucky'), 'iot'); };
    portfolioContent.append(link);
  }
  if (section.groups) portfolioContent.append(...section.groups.map(galleryGroup));
  if (section.techniques) {
    portfolioContent.append(element('h3', '', 'Tools and techniques'), element('p', 'panel-intro', section.techniques));
  }
  if (section.workflow) portfolioContent.append(marketingWorkflow(section.workflow));
  if (section.photo) portfolioContent.append(climbingFeature(section.photo));
  if (section.cards) {
    const stack = element('div', 'experience-stack');
    for (const [heading, description] of section.cards) {
      const card = element('article', 'experience-card');
      card.append(element('h3', '', heading), element('p', '', description));
      stack.append(card);
    }
    portfolioContent.append(stack);
  }
  return section.title;
}
