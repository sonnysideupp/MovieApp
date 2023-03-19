<script>


	import { VideoPlaceholder, Skeleton } from 'flowbite-svelte';

</script>


<div class="rounded-xl md:h-[415px]  h-80 w-full md:mt-0 mt-4 overflow-hidden drop-shadow-2xl bg-white">


	<VideoPlaceholder  class="rounded-xl object-cover w-[calc(100%-16px)] aspect-4/5 m-2"/>
	
	<div class="flex flex-col items-start m-2"> 

		<div role="status" class="w-full animate-pulse mt-2">
			<div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>

			<div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4"></div>
		</div>

		


	</div>

</div>
