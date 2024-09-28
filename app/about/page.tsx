import React from 'react'
import Sidebar from '../components/Sidebar'
import { getAllPosts } from '@/lib/utilities'

type Props = {}

const AboutPage = (props: Props) => {
  const allPosts = getAllPosts()
  const tags = 
    allPosts
      .map(post => post.tags)
      .flat()
      .sort()

  const tagsLower = 
    allPosts
      .map(post => post.tagsLower)
      .flat()
      .sort()

  return (
    <div className="flex space-x-8 items-center justify-center">
      <div className="lg:w-4/5 md:w-full mx-auto">
        <div className="flex flex-col lg:flex-row lg:space-x-8 justify-center">
          {/* Move Sidebar component after 3/5th width div to place sidebar on right side of page. Then change parent div to flex-col-reverse to ensure menu button appears at top of page on small viewports. */}
          <Sidebar tags={tags} tagsLower={tagsLower} />   
          <div className="flex flex-col w-full lg:w-3/5 space-y-4 items-center mb-4">
            <div className="p-8 space-y-4 rounded-lg shadow-lg w-full bg-zinc-800">
              <p className="prose text-justify text-zinc-400">
                Nullam viverra nunc id hendrerit tincidunt. Cras sit amet pretium libero. Proin mattis leo eu scelerisque porttitor. Duis vel tincidunt urna. Vivamus quis massa nec mi efficitur eleifend. Integer et augue pulvinar est rhoncus consectetur. In sed viverra augue, id ullamcorper lacus.

                Aliquam id suscipit lorem. Fusce euismod luctus magna. Vivamus eu leo vel magna elementum dictum sit amet vitae augue. Duis lacus ex, fermentum at pellentesque non, hendrerit nec nibh. Integer semper leo lacinia, faucibus metus at, pellentesque tellus. Nullam vel diam nec metus dignissim euismod. Morbi sodales elit dolor, id molestie leo cursus ut.

                Fusce a tellus nec felis ornare vestibulum. Suspendisse et orci sit amet mauris finibus luctus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus sagittis iaculis sapien, quis ullamcorper tortor lobortis vel. Curabitur congue nec magna sed laoreet. Duis tellus tellus, efficitur vitae blandit id, vehicula a arcu. Vestibulum lorem magna, gravida vel molestie sed, semper non est. Nunc fermentum hendrerit ligula ac interdum. Aenean nec ligula et lectus feugiat euismod. Sed non luctus libero, in tempus nunc. Donec posuere sem eu lectus commodo, nec sollicitudin leo porttitor. Nunc tincidunt lorem elit, vitae elementum nisi lacinia non. Proin sagittis odio odio, id lobortis leo porttitor maximus. Morbi ultricies finibus metus eget commodo. Lorem ipsum dolor sit amet, consectetur adipiscing elit.

                Proin nec ante maximus, vehicula mi vitae, facilisis lacus. Curabitur at magna lobortis, semper odio sed, venenatis velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam aliquet, urna quis blandit fermentum, neque nulla dignissim lacus, in aliquet nibh dui at lectus. Nulla tincidunt a nunc eget pulvinar. Nam efficitur dictum velit et fringilla. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eu nunc non nisi commodo lobortis quis et leo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque imperdiet tincidunt nisi ac placerat. Morbi vel rutrum tellus. Sed nec ligula velit. Sed volutpat ut ante sed fringilla. Maecenas id ante in dolor volutpat tincidunt condimentum ac mauris. Suspendisse a augue enim. Nulla eget leo a augue vehicula rutrum.

                Etiam elementum tortor in mauris iaculis, at semper eros volutpat. Aliquam eu lorem nunc. Fusce congue enim finibus sapien eleifend lacinia non a est. Morbi et est felis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras interdum eleifend diam sed tincidunt. Donec ipsum turpis, viverra sed lorem a, vehicula efficitur nulla. Aenean pellentesque, justo pretium posuere ornare, ante quam feugiat ex, et auctor lorem risus id mauris. Donec at elit quis lacus faucibus pretium at sed libero. Vivamus id odio ut elit congue dictum et vitae risus. Nulla pellentesque lacus eu sapien feugiat elementum ut sed massa.
              </p> 
            </div>
          </div>
            
        </div>
      </div>
    </div>
  )
}

export default AboutPage