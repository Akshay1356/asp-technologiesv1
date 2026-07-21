'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function PCBScene() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 4, 10);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setClearColor(0x0D0D0F, 0);
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x0A84FF, 0.15);
    scene.add(ambientLight);
    const light1 = new THREE.PointLight(0x0A84FF, 0.5, 20);
    light1.position.set(5, 8, 5);
    scene.add(light1);
    const light2 = new THREE.PointLight(0x00E5FF, 0.3, 20);
    light2.position.set(-5, -3, -5);
    scene.add(light2);

    // PCB Board
    const boardGeo = new THREE.BoxGeometry(9, 0.15, 6);
    const boardMat = new THREE.MeshStandardMaterial({
      color: 0x1C1C1E,
      metalness: 0.6,
      roughness: 0.3,
      emissive: 0x0A84FF,
      emissiveIntensity: 0.02,
    });
    const board = new THREE.Mesh(boardGeo, boardMat);
    board.position.y = -0.5;
    scene.add(board);

    // Traces
    const traceMat = new THREE.LineBasicMaterial({ color: 0x0A84FF, transparent: true });
    for (let i = 0; i < 25; i++) {
      const points = [];
      const startX = -4 + Math.random() * 8;
      const startZ = -2.5 + Math.random() * 5;
      points.push(new THREE.Vector3(startX, -0.4, startZ));
      points.push(new THREE.Vector3(startX + (Math.random() - 0.5) * 3, -0.4, startZ + (Math.random() - 0.5) * 3));
      points.push(new THREE.Vector3(startX + (Math.random() - 0.5) * 5, -0.4, startZ + (Math.random() - 0.5) * 4));
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geo, traceMat.clone());
      line.material.opacity = 0.15 + Math.random() * 0.3;
      scene.add(line);
    }

    // IC Chips
    for (let i = 0; i < 6; i++) {
      const chipGeo = new THREE.BoxGeometry(0.4 + Math.random() * 0.3, 0.08, 0.4 + Math.random() * 0.3);
      const chipMat = new THREE.MeshStandardMaterial({ color: 0x2C2C2E, metalness: 0.8, roughness: 0.2, emissive: 0x0A84FF, emissiveIntensity: 0.03 });
      const chip = new THREE.Mesh(chipGeo, chipMat);
      chip.position.set(-3.5 + Math.random() * 7, -0.38, -2 + Math.random() * 4);
      scene.add(chip);
    }

    // Vias
    const viaMat = new THREE.MeshBasicMaterial({ color: 0x0A84FF, transparent: true, side: THREE.DoubleSide, opacity: 0.5 });
    for (let i = 0; i < 15; i++) {
      const r = 0.04 + Math.random() * 0.05;
      const viaGeo = new THREE.RingGeometry(r * 0.5, r, 16);
      const via = new THREE.Mesh(viaGeo, viaMat);
      via.position.set(-4 + Math.random() * 8, -0.38, -2.5 + Math.random() * 5);
      via.rotation.x = -Math.PI / 2;
      scene.add(via);
    }

    // Electrons (particles)
    const electrons = [];
    const electronMat = new THREE.MeshBasicMaterial({ color: 0x00E5FF });
    for (let i = 0; i < 40; i++) {
      const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.025, 6, 6), electronMat);
      sphere.position.set(-4 + Math.random() * 8, -0.35, -2.5 + Math.random() * 5);
      sphere.userData = { speed: 0.3 + Math.random() * 0.5, offset: Math.random() * Math.PI * 2 };
      scene.add(sphere);
      electrons.push(sphere);
    }

    // Waveform
    const waveformPoints = [];
    for (let i = 0; i < 80; i++) {
      waveformPoints.push(new THREE.Vector3(-4 + (i / 79) * 8, 0, -2.8));
    }
    const waveformGeo = new THREE.BufferGeometry().setFromPoints(waveformPoints);
    const waveformMat = new THREE.LineBasicMaterial({ color: 0x00E5FF, transparent: true, opacity: 0.4 });
    const waveform = new THREE.Line(waveformGeo, waveformMat);
    scene.add(waveform);

    let mouseX = 0, mouseY = 0;
    const handleMouse = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouse);

    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      board.rotation.x = mouseY * 0.08 + Math.sin(time * 0.2) * 0.02;
      board.rotation.y = mouseX * 0.08 + Math.sin(time * 0.15) * 0.02;

      electrons.forEach((e, i) => {
        e.position.x += Math.sin(time * e.userData.speed + e.userData.offset) * 0.0015;
        e.position.z += Math.cos(time * e.userData.speed + e.userData.offset) * 0.0015;
      });

      const pos = waveform.geometry.attributes.position.array;
      for (let i = 0; i < pos.length; i += 3) {
        pos[i + 1] = Math.sin(time * 2 + pos[i] * 1.5) * 0.25;
      }
      waveform.geometry.attributes.position.needsUpdate = true;

      camera.position.x += (mouseX * 1.5 - camera.position.x) * 0.02;
      camera.position.y += (mouseY * 0.5 + 4 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 z-0" />;
}
