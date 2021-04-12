---
title: "Music to led project"
date: 2020-10-02T01:00:04+01:00
draft: false
tags: ["art"]
roles:
  - UX/UI Design
  - Electronic
  - Developement
description: Led strip music visualizer for artists
---

{{< leading text="**Music 2 Led** is an open source app that allows you to **create real-time audio** and **midi visualizations** on **led strips** using Arduino, Python and Electron." >}}

It was designed for DJ's, music groups or artists who want to add automated lighting effects to their shows. All you need is a computer, an arduino and a ws2812b led strip.

{{< title text="How it works">}}

{{< image src="images/music-to-led-architecture" >}}

A standalone server version is available to allow you to use it in wearable projects. It has 16 visualization effects and 8 mods.

Ce projet à initialement été travaillé sur la commande d'un artiste de Metz : Ginger Mc Curly

{{< rawhtml >}}

  </div>
    <div class="project__screen">
      <div class="project__screen__content">
        <div class="project__screen__content__image">
          {{< image src="images/showcase-ui" >}}
          {{< shape4 dotSize="60" >}}
        </div>
        
        <div class="project__screen__content__text-container">
          <h3>Application</h3>
          <p>The website has being created to promote the project and collect photos that are given by women. </p>
        <a href="#" target="_blank" class="special-button">
          <span class="content">Visit website</span>
          <span class="extra first"></span>
          <span class="extra last"></span>
        </a>
        </div>
      </div>
    </div>

  <div class="container project__container">
{{< /rawhtml >}}


{{< title text="Electronic part">}}

{{< image src="images/electronic-scheme" >}}

They can be live changed via dedicated Midi channels. You can choose to use programs like Ableton Live to automate these changes or use a dedicated synthetiser / pad to change them manually during the show.

Big principle You have to send a midi note signal for activating / modifying effects. See the doc below.
