import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type BuildType = "maven-project" | "gradle-project";

interface ProjectConfig {
  buildType: BuildType;
  groupId: string;
  artifactId: string;
  description: string;
}

const App = () => {
  const [springInitializrUrl, setSpringInitializrUrl] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectConfig>({
    defaultValues: {
      buildType: "maven-project",
      groupId: "org.home",
      artifactId: "",
      description: "",
    },
  });
  const onSubmit: SubmitHandler<ProjectConfig> = (formData) => {
    setSpringInitializrUrl(
      `https://start.spring.io/#!type=${formData.buildType}&language=java&platformVersion=3.0.0-SNAPSHOT&packaging=jar&jvmVersion=17&groupId=${formData.groupId}&artifactId=${formData.artifactId}&name=${formData.artifactId}&description=${formData.description}&packageName=${formData.groupId}.${formData.artifactId}&dependencies=devtools,lombok,web,security,data-jpa,h2,validation,actuator`
    );
    handleGenerateProject();
  };

  const handleGenerateProject = () => {
    window.open(springInitializrUrl, "_blank");
  };

  return (
    <div className="App h-[100vh] bg-black p-4 text-white">
      <h4 className="rounded bg-slate-400 p-4">
        Make selections below and we will take you to Spring Initializr with our
        preferred defaults
      </h4>
      <form
        className="flex flex-col gap-4 p-2"
        onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h4 className="mb-2">Build Type</h4>
          <div className="flex items-center gap-2">
            <label htmlFor="maven-project">Maven</label>
            <input
              type="radio"
              id="maven-project"
              // name="buildType"
              value="maven-project"
              // defaultChecked={buildType === "maven-project"}
              // onChange={(e) => setBuildType(e.target.value as BuildType)}
              {...register("buildType")}
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="gradle">Gradle</label>
            <input
              type="radio"
              id="gradle-project"
              // name="buildType"
              value="gradle-project"
              // checked={buildType === "gradle-project"}
              // onChange={(e) => setBuildType(e.target.value as BuildType)}
              {...register("buildType")}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="group-id" className="mb-2 text-2xl">
            Group Id
          </label>
          <input
            className="rounded bg-slate-500"
            id="group-id"
            type="text"
            // defaultValue={groupId}
            {...register("groupId", {
              required: "Field is required",
            })}
          />
          {errors.groupId && (
            <span className="text-indigo-300">{errors.groupId.message}</span>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="artifact-id" className="mb-2 text-2xl">
            Artifact Id
          </label>
          <input
            className="rounded bg-slate-500"
            id="artifcat-id"
            type="text"
            // defaultValue={artifactId}
            {...register("artifactId", {
              required: "Field is required",
            })}
          />
          {errors.artifactId && (
            <span className="text-indigo-300">{errors.artifactId.message}</span>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="description" className="mb-2 text-2xl">
            Description
          </label>
          <textarea
            className="rounded bg-slate-500"
            id="description"
            // defaultValue={description}
            {...register("description", {
              required: "Field is required",
            })}
          />
          {errors.description && (
            <span className="text-indigo-300">
              {errors.description.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="mt-4 w-full rounded bg-indigo-400 px-2 py-4">
          Build Project
        </button>
      </form>

      <h4>Default Dependencies - (not editable)</h4>
      <div className="flex flex-col">
        {[
          "devtools",
          "lombok",
          "web",
          "security",
          "data-jpa",
          "h2",
          "validation",
          "actuator",
        ].map((packageName) => {
          return (
            <label key={packageName} className="flex items-center gap-2">
              <input type="checkbox" checked={true} readOnly />
              {packageName}
            </label>
          );
        })}
      </div>

      {/* <h4 className="mt-8">Link:</h4>
      <span className="mt-12">{springInitializrUrl}</span> */}
    </div>
  );
};

export default App;
