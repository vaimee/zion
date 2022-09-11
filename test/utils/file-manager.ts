import { promises as fsPromises } from 'fs';
import { join } from 'path';

export async function asyncAppendFile(filename: string, data: any) {
  try {
    await fsPromises.appendFile(join(__dirname, filename), data, {
      flag: 'a+', //a+ = Open file for reading and appending. The file is created if not exists
    });

    const contents = await fsPromises.readFile(join(__dirname, filename), 'utf-8');
    console.log(contents); // 👉️ "One Two Three Four"

    return contents;
  } catch (err) {
    console.log(err);
    return 'Something went wrong';
  }
}
