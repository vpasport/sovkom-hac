import { Blocks } from '@components';

import styles from './style.module.scss';

const TestPaage = () => (
  <div className={styles.root}>
    <Blocks.IslandBlock />
    <Blocks.NotificationsBlock />
    <Blocks.ButtonsBlock />
    <Blocks.PopupBlock />
    <Blocks.InputsBlock />
    <Blocks.TextEditorBlock />
    <Blocks.LoaderBlock />
  </div>
);

export default TestPaage;
