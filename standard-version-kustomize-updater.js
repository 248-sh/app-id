const YAML = require("yaml");

module.exports.readVersion = (contents) => null;
module.exports.writeVersion = (contents, version) => {
  const yaml = YAML.parse(contents);
  const tag = `v${version}`;

  // yaml.commonLabels["app.kubernetes.io/version"] = version;

  for (const image of yaml.images) {
    image.newTag = tag;
  }

  return YAML.stringify(yaml);
};
