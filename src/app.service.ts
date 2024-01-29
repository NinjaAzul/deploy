import { Injectable } from '@nestjs/common';
import simpleGit from 'simple-git';

@Injectable()
export class AppService {
  getHello(): { message: string } {
    return {
      message: 'Hello World!',
    };
  }

  getGithubWebhook(body: any): { message: string } {
    const branch = 'master';

    // Verifica se o evento é um push na branch master
    if (
      body &&
      body.ref === `refs/heads/${branch}` &&
      body.commits.length > 0
    ) {
      // Atualiza o repositório
      const git = simpleGit();
      git.pull((err, update) => {
        if (update && update.summary.changes) {
          console.log(
            `Repositório atualizado: ${update.summary.changes} alterações`,
          );
        } else {
          console.log('Nenhuma alteração no repositório');
        }
      });
    }

    return { message: 'GitHub Webhook!' };
  }
}
