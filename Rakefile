desc "generates the ext-doc API documentation"
task :doc do
  `java -jar vendor/ext-doc/ext-doc.jar -p doc.xml -o doc -t vendor/ext-doc/template/ext/template.xml`
end

desc "builds a release version in the deploy directory"
task :deploy => :doc do
  require 'yaml'
  require 'erb'
  version = File.open('VERSION.yml') { |f| YAML::load(f) }
  version_string = "#{version[:major]}.#{version[:minor]}.#{version[:patch]}"
  File.open('pngfix.jsb2', 'w') do |jsb|
    jsb.write File.open('pngfix.jsb2.erb') { |f| ERB.new(f.read) }.result(binding)
  end
  `mkdir -p deploy releases`
  `java -jar vendor/JSBuilder2/JSBuilder2.jar --projectFile ./pngfix.jsb2 --homeDir $(pwd) -v && rm -f ./pngfix.jsb2`
end

desc "Builds the release tar.gz in the releases directory"
task :release => :deploy do
  require 'yaml'
  version = File.open('VERSION.yml') { |f| YAML::load(f) }
  version_string = "#{version[:major]}.#{version[:minor]}.#{version[:patch]}"
  `cd deploy && tar czf ../releases/pngfix-#{version_string}.tar.gz pngfix-#{version_string}`
end
