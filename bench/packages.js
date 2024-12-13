import pkgJson from './package.json' with { type: 'json' };
import mainPkgJson from '../package.json' with { type: 'json' };

const packages = Object.fromEntries(
  Object.entries(pkgJson.dependencies).map(([name, version]) => [name, `${name}@${version}`]));

packages['ansis'] = `ansis@${mainPkgJson.version}`;

export default packages;
