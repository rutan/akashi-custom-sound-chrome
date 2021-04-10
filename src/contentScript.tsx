/** @jsx h */
import { h, render } from 'preact';
import { setup } from 'goober';
import { App } from './components/App';
import { AudioFiles } from './types/AudioFiles';

setup(h);

const callback = (audioFiles: AudioFiles) => {
  (Object.keys(audioFiles) as (keyof AudioFiles)[]).forEach((key) => {
    const audio = document.querySelector(`#${key}`);
    if (!audio) return;

    const file = audioFiles[key];
    if (file) {
      audio.setAttribute('src', file);
    } else {
      audio.setAttribute('src', `/punch/${key}.mp3`);
    }
    audio.innerHTML = '<!-- removed by AKASHI Custom Sound Extension -->';
  });
};

const element = document.createElement('div');
document.body.append(element);
render(<App callback={callback} />, element);
