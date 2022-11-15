import { IApi } from 'umi';
import { join, dirname } from 'path';
import { existsSync, mkdirSync, readFileSync } from 'fs';
import { winPath } from 'umi/plugin-utils';

// 学习参考
// https://github.com/umijs/plugins/blob/master/packages/plugin-initial-state/src/index.ts
// https://github.com/umijs/plugins/blob/master/packages/plugin-request/src/index.ts
export default (api: IApi) => {
  api.describe({
    key: 'easy',
    config: {
      schema(joi) {
        return joi.string();
      },
    },
    enableBy: api.EnableBy.register,
  });

  api.modifyConfig((memo) => {
    //   memo.favicon = api.userConfig.changeFavicon;
    // console.log('memo:', memo);
    api.logger.info('modifyConfig: current:', memo);

    return memo;
  });

  const withoutRestTemplate = readFileSync(
    winPath(join(__dirname, '../src/spring/withoutRest.ts')),
    'utf-8',
  );
  const messageTemplate = readFileSync(
    winPath(join(__dirname, '../src/message.ts')),
    'utf-8',
  );
  const utilsTemplate = readFileSync(
    winPath(join(__dirname, '../src/utils.ts')),
    'utf-8',
  );
  const clientIndexTemplate = readFileSync(
    winPath(join(__dirname, '../src/clientIndex.ts')),
    'utf-8',
  );

  api.onGenerateFiles(() => {
    api.writeTmpFile({
      path: 'spring/withoutRest.ts',
      content: withoutRestTemplate,
    });

    api.writeTmpFile({
      path: 'message.ts',
      content: messageTemplate,
    });

    api.writeTmpFile({
      path: 'utils.ts',
      content: utilsTemplate,
    });

    api.writeTmpFile({
      path: 'index.ts',
      content: clientIndexTemplate,
    });
  });
};
