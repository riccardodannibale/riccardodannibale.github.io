(function () {
  'use strict';

  const root = document.getElementById('terminal');
  const outputEl = document.getElementById('output');
  const promptEl = document.getElementById('prompt-text');
  const input = document.getElementById('cmd');

  if (!root || !outputEl || !promptEl || !input) return;

  const USER = 'riccardo';
  const HOST = 'portfolio';

  const isMobile = () => window.matchMedia('(max-width: 640px)').matches;

  const FONT = {
    'A': [' █████╗ ', '██╔══██╗', '███████║', '██╔══██║', '██║  ██║', '╚═╝  ╚═╝'],
    'B': ['██████╗ ', '██╔══██╗', '██████╔╝', '██╔══██╗', '██████╔╝', '╚═════╝ '],
    'C': [' ██████╗', '██╔════╝', '██║     ', '██║     ', '╚██████╗', ' ╚═════╝'],
    'D': ['██████╗ ', '██╔══██║', '██║  ██║', '██║  ██║', '██████╔╝', '╚═════╝ '],
    'E': ['███████╗', '██╔════╝', '█████╗  ', '██╔══╝  ', '███████╗', '╚══════╝'],
    'F': ['███████╗', '██╔════╝', '█████╗  ', '██╔══╝  ', '██║     ', '╚═╝     '],
    'G': [' ██████╗ ', '██╔════╝ ', '██║  ███╗', '██║   ██║', '╚██████╔╝', ' ╚═════╝ '],
    'H': ['██╗  ██╗', '██║  ██║', '███████║', '██╔══██║', '██║  ██║', '╚═╝  ╚═╝'],
    'I': ['██╗', '██║', '██║', '██║', '██║', '╚═╝'],
    'J': ['     ██╗', '     ██║', '     ██║', '██   ██║', '╚█████╔╝', ' ╚════╝ '],
    'K': ['██╗  ██╗', '██║ ██╔╝', '█████╔╝ ', '██╔═██╗ ', '██║  ██╗', '╚═╝  ╚═╝'],
    'L': ['██╗     ', '██║     ', '██║     ', '██║     ', '███████╗', '╚══════╝'],
    'M': ['███╗   ███╗', '████╗ ████║', '██╔████╔██║', '██║╚██╔╝██║', '██║ ╚═╝ ██║', '╚═╝     ╚═╝'],
    'N': ['███╗   ██╗', '████╗  ██║', '██╔██╗ ██║', '██║╚██╗██║', '██║ ╚████║', '╚═╝  ╚═══╝'],
    'O': [' ██████╗ ', '██╔═══██╗', '██║   ██║', '██║   ██║', '╚██████╔╝', ' ╚═════╝ '],
    'P': ['██████╗ ', '██╔══██╗', '██████╔╝', '██╔═══╝ ', '██║     ', '╚═╝     '],
    'Q': [' ██████╗ ', '██╔═══██╗', '██║   ██║', '██║▄▄ ██║', '╚██████╔╝', ' ╚═══╝  '],
    'R': ['██████╗ ', '██╔══██╗', '██████╔╝', '██╔══██╗', '██║  ██║', '╚═╝  ╚═╝'],
    'S': ['███████╗', '██╔════╝', '███████╗', '╚════██║', '███████║', '╚══════╝'],
    'T': ['████████╗', '╚══██╔══╝', '   ██║   ', '   ██║   ', '   ██║   ', '   ╚═╝   '],
    'U': ['██╗   ██╗', '██║   ██║', '██║   ██║', '██║   ██║', '╚██████╔╝', ' ╚═════╝ '],
    'V': ['██╗   ██╗', '██║   ██║', '██║   ██║', '╚██╗ ██╔╝', ' ╚████╔╝ ', '  ╚═══╝  '],
    'W': ['██╗    ██╗', '██║    ██║', '██║ █╗ ██║', '██║███╗██║', '╚███╔███╔╝', ' ╚══╝╚══╝ '],
    'X': ['██╗  ██╗', '╚██╗██╔╝', ' ╚███╔╝ ', ' ██╔██╗ ', '██╔╝ ██╗', '╚═╝  ╚═╝'],
    'Y': ['██╗   ██╗', '╚██╗ ██╔╝', ' ╚████╔╝ ', '  ╚██╔╝  ', '   ██║   ', '   ╚═╝   '],
    'Z': ['███████╗', '╚══███╔╝', '  ███╔╝ ', ' ███╔╝  ', '███████╗', '╚══════╝'],
    ' ': ['  ', '  ', '  ', '  ', '  ', '  ']
  };

  function makeFiglet(word) {
    const rows = ['', '', '', '', '', ''];

    for (const ch of word.toUpperCase()) {
      const g = FONT[ch] || FONT[' '];

      for (let i = 0; i < 6; i++) {
        rows[i] += g[i] + ' ';
      }
    }

    return rows.map(r => r.replace(/\s+$/, '')).join('\n');
  }

  /*
   * Virtual filesystem
   */
  const FS = {
    type: 'dir',
    children: {

      about: {
        type: 'dir',
        children: {

          'profile.md': {
            type: 'file',
            content:
`Riccardo D'Annibale
Cybersecurity Master's student — Sapienza University, Roma

Background in Information Engineering, Computer Science
and Statistics (Bachelor, Sapienza — Latina).

Interests
  - IT security and risk management
  - Applied cryptography
  - Hardware security (FPGA)
  - Full-stack development`
          },

          'skills.md': {
            type: 'file',
            content:
`Development        Python, C/C++, HTML, CSS, JavaScript, PHP, SQL
Systems & tools    Linux, Windows, Docker, Kubernetes, MySQL,
                   phpMyAdmin, Vim, Vivado, Kathara, Draw.io
Networking & sec.  CCNA (R&S), Cybersecurity Essentials,
                   IT Essentials, Switching / Routing / Wireless`
          },

          'contact.md': {
            type: 'file',
            content:
`Email     riccardodannibale1@gmail.com
Phone     +39 327 320 5363
GitHub    https://github.com/riccardodannibale
LinkedIn  https://www.linkedin.com/in/riccardo-d-annibale-8898562b5/`
          }

        }
      },

      education: {
        type: 'dir',
        children: {

          'university.md': {
            type: 'file',
            content:
`[Present]  Master's Degree in Cybersecurity
           Sapienza University — Roma, Italy

[2025]     Bachelor's Degree in Information Engineering,
           Computer Science and Statistics
           Sapienza University — Latina Campus

[2022]     Diploma in Computer Science and Telecommunications
           IIS Carlo e Nello Rosselli — Aprilia (100/100)`
          },

          'certifications.md': {
            type: 'file',
            content:
`- IT Essentials: PC Hardware and Software   (Cisco NetAcad)
- CCNA R&S: Introduction to Networks         (Cisco NetAcad)
- Intro to CyberSecurity 2020/2021           (Cisco Scholarship)
- Cybersecurity Essentials Scholarship       (Cisco NetAcad)
- CCNAv7: Switching, Routing, Wireless       (Cisco NetAcad)
- Entrepreneurship                           (Cisco NetAcad)
- Informatica EIPASS Standard                (EIPASS)`
          }

        }
      },

      experience: {
        type: 'dir',
        children: {

          'work.md': {
            type: 'file',
            content:
`[2023 — 2026]  Corporate Training
                 IT fundamentals, cybersecurity practices,
                 Microsoft Office and development tools.

[2022 - 2026]         Website Management & Sailing Instructor
                 ASD Circolo Campeggiatori Romani — Scuola Vela FIV
                   - Website management, content updates,
                     maintenance and security validation
                   - Sailing instructor for the club

[2021 — 2022]     Private Tutor
                 Computer Science, Mathematics, Physics, Chemistry`
          }

        }
      },

      projects: {
        type: 'dir',
        children: {

          'ascon': {
            type: 'dir',
            children: {
              'README.md': {
                type: 'file',
                content:
`ASCON on FPGA — Experimental Thesis

Hardware implementation of the ASCON lightweight cryptographic
algorithm on FPGA.

Highlights
  - Verilog design
  - Vivado simulation and synthesis
  - SPI interface
  - PUF-based key generation (simulated)
  - Pipeline optimization of the permutation

Repo  riccardodannibale/TESI-SPERIMENTALE-ASCON-SU-FPGA`
              }
            }
          },

          'chat': {
            type: 'dir',
            children: {
              'README.md': {
                type: 'file',
                content:
`P2P Chat Application

Peer-to-peer messaging system written in Python.

Highlights
  - Distributed communication
  - Tkinter GUI
  - AES encryption via Fernet
  - Direct peer-to-peer connections

Repo  riccardodannibale/Chat-P2P`
              }
            }
          },

          'gym': {
            type: 'dir',
            children: {
              'README.md': {
                type: 'file',
                content:
`Complex Gym Website (full-stack)

Complete platform for gym management.

Highlights
  - Backend: PHP + MySQL (XAMPP)
  - Authentication, calendars, messaging, promotions
  - Layered architecture and separation of concerns

Repo  riccardodannibale/SITO-PALESTRA`
              }
            }
          },

          'vela': {
            type: 'dir',
            children: {
              'README.md': {
                type: 'file',
                content:
`ASD Circolo Campeggiatori Romani — Scuola Vela FIV

Website management and maintenance.

Highlights
  - Content updates
  - Maintenance
  - Security validation

Link  https://www.velaccr.it/`
              }
            }
          }

        }
      },

      homework: {
        type: 'dir',
        children: {

          homework1: {
            type: 'link',
            url: '/HOMEWORK/homework1/'
          },

          homework2: {
            type: 'link',
            url: '/HOMEWORK/homework2/index.html'
          },

          homework3: {
            type: 'link',
            url: '/HOMEWORK/homework3/index.html'
          },

          homework4: {
            type: 'link',
            url: '/HOMEWORK/homework4/index.html'
          },

          homework5: {
            type: 'link',
            url: '/HOMEWORK/homework5/index.html'
          },

          homework6: {
            type: 'link',
            url: '/HOMEWORK/homework6/index.html'
          },

          homework7: {
            type: 'link',
            url: '/HOMEWORK/homework7/index.html'
          },

          homework8: {
            type: 'link',
            url: '/HOMEWORK/homework8/index.html'
          },

          homework9: {
            type: 'link',
            url: '/HOMEWORK/homework9/index.html'
          },

          homework10: {
            type: 'link',
            url: '/HOMEWORK/homework10/index.html'
          },

          homework11: {
            type: 'link',
            url: '/HOMEWORK/homework11/index.html'
          }

        }
      },

      documents: {
        type: 'dir',
        children: {

          'CV_ITA.pdf': {
            type: 'link',
            url: '/assets/docs/Riccardo_DAnnibale_CV_ITA.pdf'
          },

          'CV_ENG.pdf': {
            type: 'link',
            url: '/assets/docs/Riccardo_DAnnibale_CV_ENG.pdf'
          }

        }
      }

    }
  };

  let cwd = [];
  const history = [];
  let histIndex = -1;

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function sanitizeUrl(url) {
    const value = String(url).trim();

    try {
      const parsed = new URL(value, window.location.origin);

      if (!['http:', 'https:'].includes(parsed.protocol)) {
        return '#';
      }

      return parsed.href;
    } catch {
      return '#';
    }
  }

  function render(s) {
    const figlets = [];

    s = s.replace(/\[\[FIGLET:([A-Z0-9 ]+)\]\]/g, function (_, word) {
      figlets.push(makeFiglet(word));
      return '\u0001F' + (figlets.length - 1) + '\u0001';
    });

    let out = escapeHtml(s);

    const links = [];

    out = out.replace(
      /\[u=([^\]]+)\]([\s\S]*?)\[\/u\]/g,
      function (_, url, label) {
        links.push(
          '<a class="term-link" href="' +
          sanitizeUrl(url) +
          '" target="_blank" rel="noopener noreferrer">' +
          label +
          '</a>'
        );

        return '\u0000L' + (links.length - 1) + '\u0000';
      }
    );

    out = out.replace(
      /(https?:\/\/[^\s)\]]+)/g,
      function (match) {
        return (
          '<a class="term-link" href="' +
          sanitizeUrl(match) +
          '" target="_blank" rel="noopener noreferrer">' +
          match +
          '</a>'
        );
      }
    );

    out = out.replace(
      /\u0000L(\d+)\u0000/g,
      function (_, i) {
        return links[+i];
      }
    );

    out = out.replace(
      /\[g\]([\s\S]*?)\[\/g\]/g,
      '<span class="c-green">$1</span>'
    );

    out = out.replace(
      /\[b\]([\s\S]*?)\[\/b\]/g,
      '<span class="c-blue">$1</span>'
    );

    out = out.replace(
      /\[y\]([\s\S]*?)\[\/y\]/g,
      '<span class="c-yellow">$1</span>'
    );

    out = out.replace(
      /\[r\]([\s\S]*?)\[\/r\]/g,
      '<span class="c-red">$1</span>'
    );

    out = out.replace(
      /\[m\]([\s\S]*?)\[\/m\]/g,
      '<span class="c-muted">$1</span>'
    );

    out = out.replace(
      /\u0001F(\d+)\u0001/g,
      function (_, i) {
        return '<span class="figlet">' + figlets[+i] + '</span>';
      }
    );

    return out;
  }

  function fitFiglets() {
    const figs = outputEl.querySelectorAll('.figlet');

    figs.forEach(function (el) {
      el.style.fontSize = '';

      const avail = el.clientWidth;

      if (!avail) return;

      const natural = el.scrollWidth;

      if (natural > avail) {
        const base =
          parseFloat(getComputedStyle(el).fontSize) || 11;

        const next = Math.max(
          4,
          Math.floor(
            base * (avail / natural) * 0.97 * 10
          ) / 10
        );

        el.style.fontSize = next + 'px';
      }
    });
  }

  function print(text) {
    const div = document.createElement('div');

    div.className = 'line';
    div.innerHTML = render(text);

    outputEl.appendChild(div);

    if (div.querySelector('.figlet')) {
      requestAnimationFrame(fitFiglets);
    }
  }

  function printTrustedHtml(html) {
    const div = document.createElement('div');

    div.className = 'line';
    div.innerHTML = html;

    outputEl.appendChild(div);
  }

  function scrollBottom() {
    requestAnimationFrame(function () {
      outputEl.scrollTop = outputEl.scrollHeight;
    });
  }

  function promptState() {
    return {
      user: USER,
      host: HOST,
      path: cwd.length === 0
        ? '~'
        : '~/' + cwd.join('/')
    };
  }

  function renderPrompt() {
    const p = promptState();

    const sUser = escapeHtml(p.user);
    const sHost = escapeHtml(p.host);
    const sPath = escapeHtml(p.path);

    if (isMobile()) {
      promptEl.innerHTML =
        '<span class="user">' + sUser + '</span>' +
        '<span class="sigil">:</span>' +
        '<span class="path">' + sPath + '</span>' +
        '<span class="sigil"> $ </span>';
    } else {
      promptEl.innerHTML =
        '<span class="user">' +
        sUser +
        '@' +
        sHost +
        '</span>' +
        '<span class="sigil">:</span>' +
        '<span class="path">' +
        sPath +
        '</span>' +
        '<span class="sigil"> $ </span>';
    }
  }

  function echoPrompt(cmd) {
    const p = promptState();

    const sUser = escapeHtml(p.user);
    const sHost = escapeHtml(p.host);
    const sPath = escapeHtml(p.path);

    const label = isMobile()
      ? '<span class="c-green">' +
        sUser +
        '</span>' +
        '<span class="c-muted">:</span>' +
        '<span class="c-blue">' +
        sPath +
        '</span>'
      : '<span class="c-green">' +
        sUser +
        '@' +
        sHost +
        '</span>' +
        '<span class="c-muted">:</span>' +
        '<span class="c-blue">' +
        sPath +
        '</span>';

    printTrustedHtml(
      label +
      '<span class="c-muted"> $ </span>' +
      escapeHtml(cmd)
    );
  }

  function resolvePath(arg) {
    if (!arg || arg === '~' || arg === '~/' || arg === '/') {
      return [];
    }

    let parts;

    if (arg.startsWith('/')) {
      parts = arg.split('/').filter(Boolean);
    } else if (arg.startsWith('~/')) {
      parts = arg.slice(2).split('/').filter(Boolean);
    } else {
      parts = cwd.concat(
        arg.split('/').filter(Boolean)
      );
    }

    const stack = [];

    for (const p of parts) {
      if (p === '' || p === '.') continue;

      if (p === '..') {
        stack.pop();
      } else {
        stack.push(p);
      }
    }

    return stack;
  }

  function getNode(pathArr) {
    let node = FS;

    for (const seg of pathArr) {
      if (
        !node.children ||
        !Object.prototype.hasOwnProperty.call(
          node.children,
          seg
        )
      ) {
        return null;
      }

      node = node.children[seg];
    }

    return node;
  }

  const commands = {};

  commands.help = function () {
    const items = [
      ['about', 'Who I am'],
      ['education', 'University and certifications'],
      ['experience', 'Work experience'],
      ['skills', 'Technical skills'],
      ['projects', 'List personal and academic projects'],
      ['explore <project>', 'Open a project page'],
      ['homework', 'Open the statistics homework blog'],
      ['cv', 'Download the CV (ITA / ENG)'],
      ['contact', 'Contact information'],
      ['github', 'GitHub profile'],
      null,
      ['ls [dir]', 'List directory contents'],
      ['cd <dir>', 'Change directory'],
      ['cat <file>', 'Show a file content'],
      ['pwd', 'Print working directory'],
      ['tree', 'Show the virtual file tree'],
      null,
      ['guide', 'Quick tour of the terminal'],
      ['clear', 'Clear the screen'],
      ['help', 'Show this message']
    ];

    let out = 'AVAILABLE COMMANDS\n';
    out += '────────────────────────────────────────────\n';

    for (const it of items) {
      if (!it) {
        out += '\n';
        continue;
      }

      const cmd = it[0];
      const desc = it[1];

      const pad = ' '.repeat(
        Math.max(2, 20 - cmd.length)
      );

      out +=
        '  [g]' +
        cmd +
        '[/g]' +
        pad +
        desc +
        '\n';
    }

    out +=
      '\nTips:  [m]↑ / ↓[/m] history    [m]Tab[/m] autocomplete';

    return out;
  };

  commands.guide = function () {
    return [
      'QUICK TOUR',
      '────────────────────────────────────────────',
      '',
      'This portfolio is a simulated terminal.',
      'Type a command and press Enter to explore.',
      '',
      '  [g]about[/g]         Who I am',
      '  [g]education[/g]     University and certifications',
      '  [g]experience[/g]    Work experience',
      '  [g]skills[/g]        Technical skills',
      '  [g]projects[/g]      List personal and academic projects',
      '  [g]explore <project>[/g]  Open a project page',
      '  [g]homework[/g]      Statistics homework blog',
      '  [g]cv[/g]            Curriculum Vitae',
      '  [g]contact[/g]      How to reach me',
      '  [g]github[/g]        GitHub profile',
      '',
      'You can also browse a virtual file system:',
      '',
      '  [g]ls[/g]              list files in the current directory',
      '  [g]cd projects[/g]     enter a directory',
      '  [g]cat README.md[/g]   read a file',
      '  [g]tree[/g]            show the whole structure',
      '',
      'Type [g]clear[/g] to reset the screen, [g]help[/g] for the full list.'
    ].join('\n');
  };

  commands.about = function () {
    return (
      '[[FIGLET:ABOUT]]\n' +
      getNode(['about', 'profile.md']).content +
      '\n\nTry [g]education[/g], [g]experience[/g], [g]skills[/g] or [g]projects[/g].'
    );
  };

  commands.education = function () {
    return (
      '[[FIGLET:EDUCATION]]\n' +
      getNode(['education', 'university.md']).content +
      '\n\n' +
      getNode(['education', 'certifications.md']).content
    );
  };

  commands.experience = function () {
    return (
      '[[FIGLET:EXPERIENCE]]\n' +
      getNode(['experience', 'work.md']).content
    );
  };

  commands.skills = function () {
    return (
      '[[FIGLET:SKILLS]]\n' +
      getNode(['about', 'skills.md']).content
    );
  };

  /*
   * PROJECT LIST
   */
  commands.projects = function () {
    const labels = {
      'ascon': 'ASCON on FPGA — Experimental Thesis',
      'chat':  'P2P Chat in Python (Fernet / Tkinter)',
      'gym':   'Complex Gym Website (PHP + MySQL)',
      'vela':  'ASD Circolo Campeggiatori Romani — Website'
    };

    let out = '[[FIGLET:PROJECTS]]\n\n';

    Object.keys(labels).forEach(function (k, i) {
      const n = String(i + 1).padStart(2, '0');
      const name = (k + '/').padEnd(12, ' ');

      out += '  [g][' + n + '][/g]  ' + name + labels[k] + '\n';
    });

    out += '\n';
    out += 'Use [g]explore <project>[/g] to open a project page.\n';
    out += 'Example: [g]explore ascon[/g]';

    return out;
  };

  /*
   * EXPLORE PROJECT
   */
  commands.explore = function (args) {
    if (!args[0]) {
      return [
        '[[FIGLET:EXPLORE]]',
        '',
        '[r]Usage:[/r] explore <project>',
        '',
        'Available projects:',
        '',
        '  [g]explore ascon[/g]',
        '  [g]explore chat[/g]',
        '  [g]explore gym[/g]',
        '  [g]explore vela[/g]'
      ].join('\n');
    }

    const project = args[0].toLowerCase().replace(/\/+$/, '');

    const pages = {
      'ascon': '/projects/ascon',
      'chat': '/projects/chat',
      'gym': '/projects/gym',
      'vela': '/projects/vela',
      'ascon-fpga': '/projects/ascon',
      'p2p-chat': '/projects/chat',
      'gym-manager': '/projects/gym',
      'sailing-website': '/projects/vela'
    };

    if (!Object.prototype.hasOwnProperty.call(pages, project)) {
      return [
        '[[FIGLET:EXPLORE]]',
        '',
        '[r]Unknown project:[/r] ' + escapeHtml(project),
        '',
        'Available projects:',
        '',
        '  ascon',
        '  chat',
        '  gym',
        '  vela'
      ].join('\n');
    }

    print('[m]Opening project: ' + escapeHtml(project) + '...[/m]');

    setTimeout(function () {
      window.location.href = pages[project];
    }, 350);

    return null;
  };

  commands.homework = function () {
    setTimeout(function () {
      window.location.href = '/HOMEWORK/';
    }, 400);

    return (
      '[[FIGLET:HOMEWORK]]\n' +
      'Opening the statistics homework blog...\n' +
      '→ [u=/HOMEWORK/]/HOMEWORK/[/u]'
    );
  };

  commands.cv = function () {
    return [
      '[[FIGLET:CV]]',
      '',
      '  [u=/assets/docs/Riccardo_DAnnibale_CV_ITA.pdf]CV — Italiano (PDF)[/u]',
      '  [u=/assets/docs/Riccardo_DAnnibale_CV_ENG.pdf]CV — English (PDF)[/u]'
    ].join('\n');
  };

  commands.contact = function () {
    return [
      '[[FIGLET:CONTACT]]',
      '',
      '  Email     riccardodannibale1@gmail.com',
      '  Phone     +39 327 320 5363',
      '  GitHub    [u=https://github.com/riccardodannibale]github.com/riccardodannibale[/u]',
      '  LinkedIn  [u=https://www.linkedin.com/in/riccardo-d-annibale-8898562b5/]Riccardo D\'Annibale[/u]'
    ].join('\n');
  };

  commands.github = function () {
    return (
      '[[FIGLET:GITHUB]]\n\n' +
      'GitHub → [u=https://github.com/riccardodannibale]github.com/riccardodannibale[/u]'
    );
  };

  commands.ls = function (args) {
    const target = args[0];

    const path = target
      ? resolvePath(target)
      : cwd.slice();

    const node = getNode(path);

    if (!node) {
      return (
        '[r]ls: ' +
        escapeHtml(target) +
        ': No such file or directory[/r]'
      );
    }

    if (node.type === 'file' || node.type === 'link') {
      return escapeHtml(target);
    }

    const names = Object.keys(
      node.children || {}
    );

    if (names.length === 0) return '';

    return names.map(function (n) {
      const c = node.children[n];

      if (c.type === 'dir') {
        return '[b]drwxr-xr-x  ' + n + '/[/b]';
      }

      if (c.type === 'link') {
        return '[y]lrwxrwxrwx  ' + n + '[/y]';
      }

      return '[m]-rw-r--r--  ' + n + '[/m]';
    }).join('\n');
  };

  commands.cd = function (args) {
    if (
      !args[0] ||
      args[0] === '~' ||
      args[0] === '/'
    ) {
      cwd = [];
      renderPrompt();
      return '';
    }

    const path = resolvePath(args[0]);
    const node = getNode(path);

    if (!node) {
      return (
        '[r]cd: ' +
        escapeHtml(args[0]) +
        ': No such file or directory[/r]'
      );
    }

    if (node.type !== 'dir') {
      return (
        '[r]cd: ' +
        escapeHtml(args[0]) +
        ': Not a directory[/r]'
      );
    }

    cwd = path;
    renderPrompt();

    return '';
  };

  commands.cat = function (args) {
    if (!args[0]) {
      return '[r]cat: missing file operand[/r]';
    }

    const path = resolvePath(args[0]);
    const node = getNode(path);

    if (!node) {
      return (
        '[r]cat: ' +
        escapeHtml(args[0]) +
        ': No such file or directory[/r]'
      );
    }

    if (node.type === 'dir') {
      return (
        '[r]cat: ' +
        escapeHtml(args[0]) +
        ': Is a directory[/r]'
      );
    }

    if (node.type === 'link') {
      return (
        '→ [u=' +
        node.url +
        ']' +
        node.url +
        '[/u]'
      );
    }

    return node.content;
  };

  commands.pwd = function () {
    return '/' + cwd.join('/');
  };

  commands.tree = function () {
    let out = '.';

    (function walk(node, prefix) {
      const names = Object.keys(
        node.children || {}
      );

      names.forEach(function (n, i) {
        const last = i === names.length - 1;

        const branch = last
          ? '└── '
          : '├── ';

        const c = node.children[n];

        const suffix =
          c.type === 'dir'
            ? '/'
            : (c.type === 'link' ? ' ->' : '');

        out +=
          '\n' +
          prefix +
          branch +
          n +
          suffix;

        if (c.type === 'dir') {
          walk(
            c,
            prefix +
            (last ? '    ' : '│   ')
          );
        }
      });
    })(FS, '');

    return out;
  };

  commands.whoami = function () {
    return USER;
  };

  commands.date = function () {
    return new Date().toString();
  };

  commands.echo = function (args) {
    return args.join(' ');
  };

  commands.clear = function () {
    outputEl.innerHTML = '';
    return null;
  };

  commands.exit = function () {
    return '[m]There is no escape from the terminal.[/m]';
  };

  commands.sudo = function () {
    return (
      '[r][sudo] password for ' +
      escapeHtml(USER) +
      ': [/r]\n' +
      '[m]Sorry, try again.[/m]\n' +
      '[m]This is a simulated terminal — nice try though.[/m]'
    );
  };

  commands.matrix = function () {
    if (
      document.getElementById('matrix-overlay')
    ) {
      return '[m]Matrix is already running...[/m]';
    }

    const overlay =
      document.createElement('div');

    overlay.id = 'matrix-overlay';

    overlay.style.cssText =
      'position:fixed;inset:0;z-index:9999;' +
      'background:#000;color:#4ade80;' +
      'font-family:JetBrains Mono,monospace;' +
      'font-size:14px;padding:12px;' +
      'white-space:pre;overflow:hidden;' +
      'pointer-events:none;';

    document.body.appendChild(overlay);

    const cols =
      Math.floor(window.innerWidth / 10);

    const rows =
      Math.floor(window.innerHeight / 18);

    const buf = [];

    for (let r = 0; r < rows; r++) {
      let line = '';

      for (let c = 0; c < cols; c++) {
        line +=
          Math.random() < 0.5
            ? '0'
            : '1';
      }

      buf.push(line);
    }

    let frame = 0;

    const id = setInterval(function () {

      overlay.textContent = buf.map(
        function (line, i) {

          if (i < frame) {
            return line;
          }

          return line.split('').map(
            function () {
              return Math.random() < 0.5
                ? '0'
                : '1';
            }
          ).join('');
        }
      ).join('\n');

      frame += 2;

      if (frame > rows + 5) {
        clearInterval(id);

        if (overlay.parentNode) {
          document.body.removeChild(
            overlay
          );
        }
      }

    }, 40);

    return '[m]entering the matrix...[/m]';
  };

  commands['?'] = commands.help;

  function execute(raw) {
    const line = raw.trim();

    echoPrompt(line);

    if (line === '') {
      scrollBottom();
      return;
    }

    history.unshift(line);

    if (history.length > 100) {
      history.pop();
    }

    histIndex = -1;

    const parts = line.split(/\s+/);
    const cmd = parts[0];
    const args = parts.slice(1);

    if (
      Object.prototype.hasOwnProperty.call(
        commands,
        cmd
      )
    ) {
      const res = commands[cmd](args);

      if (
        res !== null &&
        res !== undefined &&
        res !== ''
      ) {
        print(res);
      }
    } else {
      print(
        '[r]command not found:[/r] ' +
        escapeHtml(cmd) +
        '  —  type [g]help[/g]'
      );
    }

    scrollBottom();
  }

  function startMatrixRain() {
    const canvas =
      document.createElement('canvas');

    canvas.id = 'matrix-canvas';

    document.body.insertBefore(
      canvas,
      document.body.firstChild
    );

    const ctx = canvas.getContext('2d');

    let FONT_SIZE =
      isMobile() ? 12 : 16;

    let W;
    let H;
    let cols;
    let drops;

    function resize() {
      W = canvas.width =
        window.innerWidth;

      H = canvas.height =
        window.innerHeight;

      cols =
        Math.floor(W / FONT_SIZE);

      drops = new Array(cols);

      for (let i = 0; i < cols; i++) {
        drops[i] =
          Math.random() * -50;
      }
    }

    resize();

    let matrixResizeTimer;

    window.addEventListener(
      'resize',
      function () {
        clearTimeout(
          matrixResizeTimer
        );

        matrixResizeTimer =
          setTimeout(resize, 150);
      }
    );

    let lastDraw = 0;

    function draw(time) {
      requestAnimationFrame(draw);

      if (time - lastDraw < 55) {
        return;
      }

      lastDraw = time;

      ctx.fillStyle =
        'rgba(10, 13, 16, 0.09)';

      ctx.fillRect(
        0,
        0,
        W,
        H
      );

      ctx.font =
        FONT_SIZE +
        'px "JetBrains Mono", monospace';

      for (let i = 0; i < cols; i++) {

        const x =
          i * FONT_SIZE;

        const y =
          drops[i] * FONT_SIZE;

        const ch =
          Math.random() < 0.5
            ? '0'
            : '1';

        ctx.fillStyle =
          Math.random() < 0.08
            ? '#e8fff5'
            : '#4ade80';

        ctx.fillText(
          ch,
          x,
          y
        );

        if (
          y > H &&
          Math.random() > 0.975
        ) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    }

    requestAnimationFrame(draw);
  }

  let hintEl = null;

  function hideHint() {
    if (hintEl) {
      hintEl.classList.add('hide');

      setTimeout(function () {
        if (
          hintEl &&
          hintEl.parentNode
        ) {
          hintEl.parentNode.removeChild(
            hintEl
          );
        }

        hintEl = null;
      }, 400);
    }
  }

  input.addEventListener(
    'keydown',
    function (e) {

      if (e.key === 'Enter') {

        const v = input.value;

        input.value = '';

        execute(v);

        if (isMobile()) {
          setTimeout(function () {
            input.focus();
          }, 0);
        }

      } else if (e.key === 'ArrowUp') {

        e.preventDefault();

        if (!history.length) return;

        histIndex =
          Math.min(
            histIndex + 1,
            history.length - 1
          );

        input.value =
          history[histIndex] || '';

      } else if (e.key === 'ArrowDown') {

        e.preventDefault();

        if (!history.length) return;

        histIndex =
          Math.max(
            histIndex - 1,
            -1
          );

        input.value =
          histIndex === -1
            ? ''
            : history[histIndex];

      } else if (e.key === 'Tab') {

        e.preventDefault();

        const v = input.value;

        const parts =
          v.split(/\s+/);

        const last =
          parts[parts.length - 1] || '';

        const node =
          getNode(cwd);

        if (
          parts[0] === 'explore' &&
          parts.length >= 2
        ) {
          const projectNames =
            Object.keys(
              FS.children.projects.children
            );

          const matches =
            projectNames.filter(
              function (n) {
                return n.startsWith(last);
              }
            );

          if (matches.length === 1) {
            parts[parts.length - 1] =
              matches[0];

            input.value =
              parts.join(' ');

          } else if (matches.length > 1) {

            print(
              matches.map(
                function (m) {
                  return (
                    '[m]' +
                    escapeHtml(m) +
                    '[/m]'
                  );
                }
              ).join('    ')
            );

            scrollBottom();
          }

          return;
        }

        if (!node || !node.children) {
          return;
        }

        const matches =
          Object.keys(
            node.children
          ).filter(
            function (n) {
              return n.startsWith(last);
            }
          );

        if (matches.length === 1) {

          parts[parts.length - 1] =
            matches[0];

          input.value =
            parts.join(' ');

        } else if (matches.length > 1) {

          print(
            matches.map(
              function (m) {
                return (
                  '[m]' +
                  escapeHtml(m) +
                  '[/m]'
                );
              }
            ).join('    ')
          );

          scrollBottom();
        }
      }
    }
  );

  input.addEventListener(
    'input',
    hideHint,
    { once: true }
  );

  document.addEventListener(
    'click',
    function (e) {
      if (e.target.closest('a')) {
        return;
      }

      input.focus();
    }
  );

  input.addEventListener(
    'focus',
    function () {
      setTimeout(
        scrollBottom,
        300
      );
    }
  );

  let resizeTimer = null;

  window.addEventListener(
    'resize',
    function () {

      clearTimeout(resizeTimer);

      resizeTimer =
        setTimeout(
          function () {
            fitFiglets();
            scrollBottom();
          },
          120
        );
    }
  );

  function boot() {

    startMatrixRain();

    print('[[FIGLET:RICCARDO]]');

    print(
      '[m]Cybersecurity · Engineering · Programming[/m]'
    );

    print('');

    print(
      'This is a [y]simulated terminal[/y] — no real shell is executed.'
    );

    print(
      'Type a command and press [g]Enter[/g] to explore.'
    );

    print('');

    print(
      'Start with [g]guide[/g] for a quick tour, or [g]help[/g] for all commands.'
    );

    print(
      '[m]Try also: about · projects · explore · cv · contact · matrix[/m]'
    );

    print('');

    renderPrompt();

    input.focus();

    scrollBottom();

    if (isMobile()) {

      hintEl =
        document.createElement('div');

      hintEl.id = 'tap-hint';

      hintEl.textContent =
        'tap to type';

      document.body.appendChild(
        hintEl
      );

      setTimeout(function () {
        if (hintEl) {
          hintEl.classList.add('hide');
        }
      }, 4000);
    }
  }

  boot();

})();
