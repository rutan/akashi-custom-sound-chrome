import { useEffect, useState } from 'preact/hooks';
import { load, save } from '../functions/storage';
import { AudioFiles } from '../types/AudioFiles';

export function useAudioFiles(
  callback: (audioFiles: AudioFiles) => void
): [AudioFiles, (audioFiles: AudioFiles) => void] {
  const [isLoaded, dispatchIsLoaded] = useState(false);
  const [audioFiles, dispatchAudioFiles] = useState<AudioFiles>({ s01: '', t01: '', e01: '' });

  useEffect(() => {
    load(Object.keys(audioFiles)).then((data) => {
      dispatchIsLoaded(true);
      dispatchAudioFiles(Object.assign({}, audioFiles, data));
    });
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    (Object.keys(audioFiles) as (keyof AudioFiles)[]).forEach((key) => {
      save(key, audioFiles[key]);
    });

    callback(audioFiles);
  }, [audioFiles]);

  return [audioFiles, dispatchAudioFiles];
}
