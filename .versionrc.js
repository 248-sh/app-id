module.exports = {
  bumpFiles: [
    {
      filename: "package.json",
      type: "json",
    },
    {
      filename: "kustomize/kustomization.yaml",
      updater: require("./standard-version-kustomize-updater"),
    },
  ],
};
