import { spawn } from 'child_process';

export class Process {

  _args: string[];
  _command: string;
  _name: string;

  constructor(name, command) {
    this._name = name;
    const tokens = command.split(' ');
    this._command = tokens.shift();
    this._args = tokens;
    this.execute = this.execute.bind(this);
  }


  execute(): Promise<any> {
    const data = [];

    return new Promise((resolve, reject) => {
      const output = {
        stdout: [],
        stderr: []
      };

      const command = spawn(this._command, this._args, { shell: true });

      command.stdout.on('data', data => {
        output.stdout.push(data.toString());
      });

      command.stderr.on('error', error => {
        output.stderr.push(error);
      });

      command.on('close', code => {
        const result = {
          name: this._name,
          stdout: output.stdout.join(),
          stderr: output.stderr.join()
        }
        if(code === 0) return resolve(result);
        reject(result);
      })
    })


  }

}
