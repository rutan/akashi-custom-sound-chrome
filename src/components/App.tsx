/** @jsx h */
import { h } from 'preact';
import { useState } from 'preact/hooks';
import { styled } from 'goober';
import { AudioFiles } from '../types/AudioFiles';
import { useAudioFiles } from '../hooks/useAudioFiles';
import { Button } from './Button';
import { SoundConfig } from './SoundConfig';

interface Props {
  callback: (audioFiles: AudioFiles) => void;
}

const Container = styled('div')``;

const OpenButton = styled(Button)`
  position: fixed;
  z-index: 999999;
  right: 15px;
  bottom: 15px;
  width: 160px;
  height: 48px;
  border-radius: 24px;
  background: #333;
  color: #fff;
  font-size: 14px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
`;

const Modal = styled('div')`
  position: fixed;
  z-index: 999999;
  right: 15px;
  bottom: calc(15px + 48px + 15px);
  width: 100%;
  max-width: 500px;
  background: #fff;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const CustomSoundConfig = styled(SoundConfig)`
  margin-top: 20px;

  &:first-of-type {
    margin-top: 0;
  }
`;

export const App = ({ callback }: Props) => {
  const [isShowModal, dispatchIsShowModal] = useState(false);
  const [audioFiles, dispatchAudioFiles] = useAudioFiles((audioFiles: AudioFiles) => {
    callback(audioFiles);
  });

  return (
    <Container>
      <OpenButton onClick={() => dispatchIsShowModal(!isShowModal)}>
        {isShowModal ? '閉じる' : '[非公式] 音声設定'}
      </OpenButton>
      <Modal
        style={{
          display: isShowModal ? 'block' : 'none',
        }}
      >
        {(Object.keys(audioFiles) as (keyof AudioFiles)[]).map((key) => {
          return (
            <CustomSoundConfig
              key={key}
              name={key}
              audioFile={audioFiles[key]}
              onUpdate={(audioFile: string) => {
                dispatchAudioFiles(Object.assign({}, audioFiles, { [key]: audioFile }));
              }}
              onRemove={() => {
                dispatchAudioFiles(Object.assign({}, audioFiles, { [key]: '' }));
              }}
            />
          );
        })}
      </Modal>
    </Container>
  );
};
