desc "generates the ext-doc API documentation"
task :doc do
  `java -jar vendor/ext-doc/ext-doc.jar -p doc.xml -o doc -t vendor/ext-doc/template/ext/template.xml -verbose`
end

task :deploy => :doc do
  `java -jar vendor/JSBuilder2/JSBuilder2.jar --projectFile ./pngfix.jsb2 --homeDir $(pwd) -v`
  `tar czvf pngfix-1.0.tar.gz pngfix-1.0`
end