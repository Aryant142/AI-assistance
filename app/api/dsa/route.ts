import { NextRequest, NextResponse } from 'next/server'

interface DSAQuestion {
  id: string
  title: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  category: string
  acceptance: number
}

const DSA_QUESTIONS: Record<string, DSAQuestion[]> = {
  arrays: [
    { id: '1', title: 'Two Sum', difficulty: 'Easy', category: 'Arrays', acceptance: 48 },
    { id: '2', title: 'Add Two Numbers', difficulty: 'Medium', category: 'Arrays', acceptance: 32 },
    { id: '3', title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', category: 'Arrays', acceptance: 33 },
    { id: '4', title: 'Median of Two Sorted Arrays', difficulty: 'Hard', category: 'Arrays', acceptance: 27 },
    { id: '5', title: 'Longest Palindromic Substring', difficulty: 'Medium', category: 'Arrays', acceptance: 32 },
    { id: '6', title: 'Reverse Integer', difficulty: 'Easy', category: 'Arrays', acceptance: 26 },
    { id: '7', title: 'String to Integer', difficulty: 'Medium', category: 'Arrays', acceptance: 14 },
    { id: '8', title: 'Palindrome Number', difficulty: 'Easy', category: 'Arrays', acceptance: 52 },
  ],
  strings: [
    { id: '9', title: 'Regular Expression Matching', difficulty: 'Hard', category: 'Strings', acceptance: 27 },
    { id: '10', title: 'Container With Most Water', difficulty: 'Medium', category: 'Strings', acceptance: 52 },
    { id: '11', title: 'Integer to Roman', difficulty: 'Medium', category: 'Strings', acceptance: 60 },
    { id: '12', title: 'Roman to Integer', difficulty: 'Easy', category: 'Strings', acceptance: 58 },
    { id: '13', title: 'Longest Common Prefix', difficulty: 'Easy', category: 'Strings', acceptance: 34 },
    { id: '14', title: 'Valid Parentheses', difficulty: 'Easy', category: 'Strings', acceptance: 40 },
  ],
  'linked-lists': [
    { id: '15', title: 'Merge Two Sorted Lists', difficulty: 'Easy', category: 'Linked Lists', acceptance: 60 },
    { id: '16', title: 'Remove Duplicates from Sorted List', difficulty: 'Easy', category: 'Linked Lists', acceptance: 48 },
    { id: '17', title: 'Reverse Linked List', difficulty: 'Easy', category: 'Linked Lists', acceptance: 60 },
    { id: '18', title: 'Linked List Cycle', difficulty: 'Easy', category: 'Linked Lists', acceptance: 44 },
    { id: '19', title: 'Copy List with Random Pointer', difficulty: 'Hard', category: 'Linked Lists', acceptance: 40 },
  ],
  trees: [
    { id: '20', title: 'Binary Tree Inorder Traversal', difficulty: 'Easy', category: 'Trees', acceptance: 64 },
    { id: '21', title: 'Binary Tree Level Order Traversal', difficulty: 'Medium', category: 'Trees', acceptance: 60 },
    { id: '22', title: 'Maximum Depth of Binary Tree', difficulty: 'Easy', category: 'Trees', acceptance: 67 },
    { id: '23', title: 'Lowest Common Ancestor', difficulty: 'Medium', category: 'Trees', acceptance: 57 },
    { id: '24', title: 'Binary Tree Maximum Path Sum', difficulty: 'Hard', category: 'Trees', acceptance: 38 },
  ],
  graphs: [
    { id: '25', title: 'Number of Islands', difficulty: 'Medium', category: 'Graphs', acceptance: 56 },
    { id: '26', title: 'Clone Graph', difficulty: 'Medium', category: 'Graphs', acceptance: 40 },
    { id: '27', title: 'Course Schedule', difficulty: 'Medium', category: 'Graphs', acceptance: 43 },
    { id: '28', title: 'Word Ladder', difficulty: 'Hard', category: 'Graphs', acceptance: 36 },
  ],
  dp: [
    { id: '29', title: 'Climbing Stairs', difficulty: 'Easy', category: 'Dynamic Programming', acceptance: 51 },
    { id: '30', title: 'House Robber', difficulty: 'Medium', category: 'Dynamic Programming', acceptance: 41 },
    { id: '31', title: 'Coin Change', difficulty: 'Medium', category: 'Dynamic Programming', acceptance: 39 },
    { id: '32', title: 'Edit Distance', difficulty: 'Hard', category: 'Dynamic Programming', acceptance: 54 },
    { id: '33', title: 'Longest Increasing Subsequence', difficulty: 'Medium', category: 'Dynamic Programming', acceptance: 41 },
  ],
  sorting: [
    { id: '34', title: 'Merge Sorted Array', difficulty: 'Easy', category: 'Sorting', acceptance: 41 },
    { id: '35', title: 'Sort List', difficulty: 'Medium', category: 'Sorting', acceptance: 51 },
    { id: '36', title: 'Largest Number', difficulty: 'Medium', category: 'Sorting', acceptance: 30 },
    { id: '37', title: 'Kth Largest Element in an Array', difficulty: 'Medium', category: 'Sorting', acceptance: 57 },
  ],
  searching: [
    { id: '38', title: 'Search Insert Position', difficulty: 'Easy', category: 'Searching', acceptance: 41 },
    { id: '39', title: 'Search in Rotated Sorted Array', difficulty: 'Medium', category: 'Searching', acceptance: 33 },
    { id: '40', title: 'Find First and Last Position', difficulty: 'Medium', category: 'Searching', acceptance: 38 },
    { id: '41', title: 'Search a 2D Matrix II', difficulty: 'Medium', category: 'Searching', acceptance: 44 },
  ],
  hashing: [
    { id: '42', title: 'Valid Anagram', difficulty: 'Easy', category: 'Hashing', acceptance: 65 },
    { id: '43', title: 'Group Anagrams', difficulty: 'Medium', category: 'Hashing', acceptance: 58 },
    { id: '44', title: 'Ransom Note', difficulty: 'Easy', category: 'Hashing', acceptance: 55 },
    { id: '45', title: 'Isomorphic Strings', difficulty: 'Easy', category: 'Hashing', acceptance: 40 },
  ],
  'stacks-queues': [
    { id: '46', title: 'Min Stack', difficulty: 'Medium', category: 'Stacks & Queues', acceptance: 49 },
    { id: '47', title: 'Implement Queue using Stacks', difficulty: 'Easy', category: 'Stacks & Queues', acceptance: 60 },
    { id: '48', title: 'Daily Temperatures', difficulty: 'Medium', category: 'Stacks & Queues', acceptance: 66 },
    { id: '49', title: 'Sliding Window Maximum', difficulty: 'Hard', category: 'Stacks & Queues', acceptance: 45 },
  ],
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const topic = searchParams.get('topic')?.toLowerCase()

    if (!topic) {
      return NextResponse.json(
        { error: 'Topic parameter is required' },
        { status: 400 }
      )
    }

    if (!DSA_QUESTIONS[topic]) {
      return NextResponse.json(
        { error: `Topic '${topic}' not found. Available topics: ${Object.keys(DSA_QUESTIONS).join(', ')}` },
        { status: 404 }
      )
    }

    const questions = DSA_QUESTIONS[topic]

    return NextResponse.json({
      success: true,
      topic,
      questions,
      count: questions.length,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('DSA API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch DSA questions' },
      { status: 500 }
    )
  }
}
