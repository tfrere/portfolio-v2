---
title: "Music to led"
date: 2021-03-02T01:00:04+01:00
draft: false
tags: ["app"]
roles:
  - UX/UI Design
  - Electronic
  - Developement
description: Led strip music visualizer for artists
---

Music 2 Led is an open source app that allows you to create real-time audio and midi visualizations on led strips using Arduino, Python and Electron. It was designed for DJ's, music groups or artists who want to add automated lighting effects to their shows.

All you need is a computer, an arduino and a ws2812b led strip.

Ce projet à initialement été travaillé sur la commande d'un artiste de Metz : Ginger Mc Curly

{{< image src="images/showcase-ui" >}}

A standalone server version is available to allow you to run projects on raspberry pi. ( Tested with a raspberry pi 4 ) It can be found here.

Music To Led has 16 visualization effects and 8 mods.

They can be live changed via dedicated Midi channels. You can choose to use programs like Ableton Live to automate these changes or use a dedicated synthetiser / pad to change them manually during the show.

Big principle You have to send a midi note signal for activating / modifying effects. See the doc below.
