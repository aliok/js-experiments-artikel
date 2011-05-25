#
# Copyright [2011] [Ali Ok - aliok@apache.org]
#
#    Licensed under the Apache License, Version 2.0 (the "License");
#    you may not use this file except in compliance with the License.
#    You may obtain a copy of the License at
#
#        http://www.apache.org/licenses/LICENSE-2.0
#
#    Unless required by applicable law or agreed to in writing, software
#    distributed under the License is distributed on an "AS IS" BASIS,
#    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#    See the License for the specific language governing permissions and
#    limitations under the License.
#

begin

require 'rubygems'
require 'wikicloth'

@wiki = WikiCloth::Parser.new({
  :data => File.read("README.mediawiki"),
  :params => { "test" => "World" } })

pathDirectory = "target"
if(not(File.exists?(pathDirectory)))
  Dir.mkdir(pathDirectory)
end

File.open('target/README.html', 'w') do |f|
  f.puts @wiki.to_html
end

end
