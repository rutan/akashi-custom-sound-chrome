/** @jsx h */
import { h } from 'preact';
import { styled } from 'goober';
import { Button } from './Button';

interface Props {
  className?: string;
  name: string;
  audioFile: string;
  onUpdate: (audioFile: any) => void;
  onRemove: () => void;
}

const Container = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled('div')`
  width: 4em;
  text-align: center;
  font-weight: bold;
  color: #113458;
`;

const Item = styled('div')`
  display: flex;
  align-items: center;
  height: 48px;
`;

const AudioPlayer = styled('audio')`
  flex: 1;
  max-height: 48px;
`;

const Control = styled('div')`
  width: 100px;
`;

const RemoveButton = styled(Button)`
  width: 100%;
  height: 48px;
  border-radius: 24px;
  background: #f66;
  color: #fff;
  font-size: 14px;
`;

const NAME_MAP = new Map<string, string>();
NAME_MAP.set('s01', '出勤');
NAME_MAP.set('t01', '退勤');
NAME_MAP.set('e01', '操作音');

function onChange(e: Event) {
  return new Promise((resolve, reject) => {
    const inputForm = e.target as HTMLInputElement;
    if (!inputForm || !inputForm.files) return;

    const file = inputForm.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export const SoundConfig = ({ className, name, audioFile, onUpdate, onRemove }: Props) => {
  return (
    <Container className={className}>
      <Title>{NAME_MAP.get(name) || name}</Title>
      {audioFile ? (
        <Item>
          <AudioPlayer src={audioFile} controls={true} />
        </Item>
      ) : (
        <Item>
          <input
            type="file"
            onChange={(e) => {
              onChange(e)
                .then((result) => onUpdate(result))
                .catch((e) => {
                  console.error(e);
                  alert('ファイルの読み込みに失敗しました');
                });
            }}
          />
        </Item>
      )}
      <Control>{audioFile ? <RemoveButton onClick={onRemove}>削除する</RemoveButton> : null}</Control>
    </Container>
  );
};
