import pkgJson from './package.json' assert { type: 'json' };
import mainPkgJson from '../package.json' assert { type: 'json' };

const packages = Object.fromEntries(
  Object.entries(pkgJson.dependencies).map(([name, version]) => [name, `${name}@${version}`]));

packages['ansis'] = `ansis@${mainPkgJson.version}`;

export default packages;
