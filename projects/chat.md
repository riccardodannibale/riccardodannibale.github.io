---
layout: project
title: P2P Chat Application
permalink: /projects/chat/
---

<!-- Stili correttivi per la resa delle immagini -->
<style>
  /* Immagine di copertina principale */
  .project-cover {
    width: 100%;
    max-width: 100%;
    height: auto;
    max-height: 500px;
    object-fit: contain; /* Mantiene le proporzioni reali senza tagliare l'interfaccia */
    display: block;
    margin: 0 auto 2rem auto;
    border-radius: 8px;
  }

  /* Grid per la galleria */
  .project-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    align-items: start;
    margin-top: 1.5rem;
  }

  .gallery-item {
    display: block;
    width: 100%;
    overflow: hidden;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: #0d1117; /* Background scuro di sicurezza per screenshot */
  }

  .gallery-item img {
    width: 100%;
    height: 220px; /* Altezza fissa uniforme per la griglia */
    object-fit: contain; /* Mostra l'intera immagine senza tagliarla */
    padding: 8px; /* Spazio interno per valorizzare lo screenshot */
    box-sizing: border-box;
    display: block;
    transition: transform 0.2s ease, opacity 0.2s ease;
  }

  .gallery-item:hover img {
    transform: scale(1.02);
    opacity: 0.95;
  }
</style>

<div class="project-page">

<div class="project-header">

<div class="project-kicker">02 / NETWORKING & CRYPTOGRAPHY</div>

<h1>P2P Chat Application</h1>

<p class="project-subtitle">
A peer-to-peer messaging application with a graphical interface,
direct communication between peers and symmetric encryption.
</p>

</div>

<img
class="project-cover"
src="{{ '/assets/images/projects/chat/01.png' | relative_url }}"
alt="P2P Chat Application">


<div class="project-section">

<h2>Overview</h2>

<p>
This project implements a real peer-to-peer chat application using
Python and Tkinter. Each peer is autonomous and can operate both as
a server and as a client, establishing a direct connection with the
other peer.
</p>

<p>
The application combines networking, graphical interface development,
local persistence and cryptography into a single project.
</p>

</div>


<div class="project-section">

<h2>What I developed</h2>

<ul>
<li>Peer-to-peer communication</li>
<li>Graphical interface using Tkinter</li>
<li>Encrypted message transmission</li>
<li>Local chat history</li>
<li>Emoji support using PNG images</li>
<li>Separate peer launcher</li>
<li>Connection and communication logic</li>
</ul>

</div>


<div class="project-section">

<h2>Architecture</h2>

<p>
The application is divided into several modules, each responsible
for a specific aspect of the system.
</p>

<ul>
<li><code>chat_ui.py</code> — graphical user interface</li>
<li><code>p2p_core.py</code> — peer-to-peer logic and cryptography</li>
<li><code>peer_app.py</code> — main application launcher</li>
<li><code>emoji_png/</code> — emoji image resources</li>
<li><code>chat_history.txt</code> — local message history</li>
</ul>

</div>


<div class="project-section">

<h2>Security</h2>

<p>
Messages are encrypted during transmission using symmetric
cryptography through the Python <code>cryptography</code> library.
The project uses Fernet-based encryption for protecting the exchanged
messages.
</p>

</div>


<div class="project-section">

<h2>Features</h2>

<ul>
<li>Encrypted messaging</li>
<li>Direct peer-to-peer communication</li>
<li>Graphical interface</li>
<li>Emoji integration</li>
<li>Persistent chat history</li>
<li>Two independent peer instances</li>
</ul>

</div>


<div class="project-section">

<h2>Technologies</h2>

<div class="project-stack">

<span class="stack-item">Python</span>
<span class="stack-item">Tkinter</span>
<span class="stack-item">P2P Networking</span>
<span class="stack-item">Cryptography</span>
<span class="stack-item">Fernet</span>
<span class="stack-item">Pillow</span>

</div>

</div>


<div class="project-section">

<h2>Running the application</h2>

<p>
Two peer instances are launched independently. Each instance opens
its own Tkinter window and connects directly to the other peer.
</p>

</div>


<div class="project-section">

<h2>Gallery</h2>

<div class="project-gallery">

<a class="gallery-item"
   href="{{ '/assets/images/projects/chat/01.png' | relative_url }}"
   target="_blank">

<img src="{{ '/assets/images/projects/chat/01.png' | relative_url }}"
     alt="P2P chat screenshot">

</a>

<a class="gallery-item"
   href="{{ '/assets/images/projects/chat/02.png' | relative_url }}"
   target="_blank">

<img src="{{ '/assets/images/projects/chat/02.png' | relative_url }}"
     alt="P2P chat screenshot">

</a>

<a class="gallery-item"
   href="{{ '/assets/images/projects/chat/03.png' | relative_url }}"
   target="_blank">

<img src="{{ '/assets/images/projects/chat/03.png' | relative_url }}"
     alt="P2P chat screenshot">

</a>

</div>

</div>


<div class="project-navigation">

<a class="project-button"
   href="{{ '/' | relative_url }}">
← Back to terminal
</a>

<div style="display: flex; gap: 15px;">
<a class="project-button"
   href="{{ '/progetti/' | relative_url }}">
All projects
</a>

<a class="project-button"
   href="https://github.com/riccardodannibale/Chat-P2P"
   target="_blank"
   rel="noreferrer">
GitHub →
</a>
</div>

</div>

</div>
