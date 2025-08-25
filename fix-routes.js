const fs = require('fs');
const path = require('path');

const files = [
  'src/app/api/clients/[id]/route.ts',
  'src/app/api/leads/[id]/route.ts', 
  'src/app/api/quotes/[id]/pdf/route.ts',
  'src/app/api/quotes/[id]/route.ts'
];

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  
  // Fix params type and await params
  const fixed = content
    .replace(/{ params }: { params: { id: string } }/g, '{ params }: { params: Promise<{ id: string }> }')
    .replace(/params\.id/g, (match, offset) => {
      // Check if we need to add await
      const beforeMatch = content.substring(Math.max(0, offset - 100), offset);
      if (!beforeMatch.includes('await params')) {
        // Add the await statement at the beginning of try block
        return 'id';
      }
      return match;
    })
    .replace(/\) {\n  try {/g, ') {\n  try {\n    const { id } = await params;');
    
  fs.writeFileSync(file, fixed);
  console.log(`Fixed: ${file}`);
});

console.log('All route handlers updated for Next.js 15');
