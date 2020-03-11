import React from 'react';
import ArticlesRanker from './ArticlesRanker';
import axiosMock from 'axios';
import { render, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

jest.mock('axios');
jest.mock('./ArticlesRanker');

// Unit tests
describe('generateRandomArticleSequence()', () => {
  const sampleSequence
    = ArticlesRanker.prototype.generateRandomArticleSequence();

  test("is an array", () => {
    expect(sampleSequence).toBeInstanceOf(Array);
  });

  // Below two tests imply that the numbers in sampleSequence are unique.
  test("is of length 5", () => {
    expect(sampleSequence).toHaveLength(5);
  });

  test("contains the numbers [1, 2, 3, 4, 5]", () => {
    for (let elem = 1; elem <= 5; elem++) {
      expect(sampleSequence).toContain(elem);
    }
  });
});

describe('fetchArticleData()', () => {
  test("executes GET requests when given article_num's between 1 and 5",
    async () => {
      // Prepare the mocked data to return in the response when the test calls
      // fetchArticleData() to request from our server
      const mockedData = {
        title: 'Hello',
        body: [
          {
            type: 'heading',
            model: {
              text: 'Hello'
            }
          }
        ]
      };

      axiosMock.get.mockResolvedValue({
        data: mockedData
      });

      // Check all valid article numbers call the Axios GET function
      const url_list = [
        'http://localhost:3001/article-1',
        'http://localhost:3001/article-2',
        'http://localhost:3001/article-3',
        'http://localhost:3001/article-4',
        'http://localhost:3001/article-5'
      ];

      for (let iteration = 1; iteration <= 5; iteration++) {
        let data = await ArticlesRanker.prototype.
          fetchArticleData(iteration).data;
        expect(data).toContainEqual(mockedData);

        // Check that we only attempted the fetch once per call to
        // fetchArticleData() (expect 5 calls in total for this test)
        expect(axiosMock.get).toHaveBeenCalledTimes(iteration);
        expect(axiosMock.get).toHaveBeenCalledWith(url_list[iteration - 1]);
      }
  });

  test("throws an invalid value exception when given any other value",
    () => {
      const errorMessage
        = "Article number must be an integer between 1 and 5 (inclusive)";

      // Test for parameters 0, 6, 10, -1
      const test_err_ints = [0, 6, 10, -1];
      for (let param of test_err_ints) {
        expect(async () => {
          return await ArticlesRanker.prototype.fetchArticleData(param);
        }).toThrow(new Error(errorMessage));
      }
      // Test for string parameter
      expect(async () => {
        return await ArticlesRanker.prototype.fetchArticleData('');
      }).toThrow(new Error(errorMessage));

      // Test for array parameter
      expect(async () => {
        return await ArticlesRanker.prototype.fetchArticleData([]);
      }).toThrow(new Error(errorMessage));

      // Test for object prototype parameter
      expect(async () => {
        return await ArticlesRanker.prototype.fetchArticleData({});
      }).toThrow(new Error(errorMessage));
  });

  test("throws an exception when data fetching fails (due to server error)",
    () => {
      axiosMock.get.mockResolvedValue({
        status: 500,
        type: 'error',
        message: 'An unexpected error occured'
      });

      const test_url = 'http://localhost:3001/article-1';

      expect(async () => {
        return await ArticlesRanker.prototype.fetchArticleData(1);
      }).toThrow(new Error("Could not fetch data from server"));

      expect(axiosMock.get).toHaveBeenCalledTimes(1);
      expect(axiosMock.get).toHaveBeenCalledWith(test_url);
  });
});

describe('Rendering (render() and render[Property]() for each property)',
  () => {
    // Setup for the series of rendering tests
    // Mock returned data from server
    const mockedData = {
      title: 'Test Title',
      body: [
        {
          type: 'heading',
          model: { text: 'Test Heading' }
        },
        {
          type: 'paragraph',
          model: { text: 'Test paragraph' }
        },
        {
          type: 'image',
          model: {
            url: 'http://localhost:3001/image',
            altText: 'Test image',
            height: 420,
            width: 640
          }
        },
        {
          type: 'list',
          model: {
            type: 'unordered',
            items: [
              'Test item 1',
              'Test item 2'
            ]
          }
        }
      ]
    };
    // Mock call to generateRandomArticleSequence()
    ArticlesRanker.prototype.generateRandomArticleSequence.mockImplementation(
      () => 1);
    // Mock call to fetchArticleData()
    ArticlesRanker.prototype.fetchArticleData.mockImplementation(
      (article_num) => mockedData);

    axiosMock.get.mockResolvedValueOnce({
      status: 301,
      header: {
        location: 'http://localhost:3001/image_redirect'
      }
    }).mockResolvedValueOnce({
      data: {}
    });

    // Render the mocked ArticlesRanker application
    const { getByText, getByRole } = render(<ArticlesRanker />);

    // Begin tests
    test("Data fetching functions called", () => {
      expect(ArticlesRanker.prototype.generateRandomArticleSequence
      ).toHaveBeenCalledTimes(1);
      expect(ArticlesRanker.prototype.generateRandomArticleSequence
      ).toHaveBeenCalledWith(1);
      expect(ArticlesRanker.prototype.fetchArticleData
      ).toHaveBeenCalledTimes(1);
    });

    test("heading rendered", async () => {
      const heading = await waitForElement(
        () => { getByRole('heading') });
      expect(heading).toHaveTextContent('Text Heading');
    });

    test("paragraphs rendered", async () => {
      const paragraph = await waitForElement(
        () => { getByText('Test paragraph') });
      expect(paragraph).toBeInTheDocument();
    });

    test("images rendered", async () => {
      const image = await waitForElement(
        () => { getByRole('img') });
      expect(image).toHaveAttribute('height', 420);
      expect(image).toHaveAttribute('width', 640);
      expect(image).toHaveAttribute('alt-text', 'Test image');

      // Test that axios GET for fetching image data
      // is being called correctly
      expect(axiosMock.get).toHaveBeenCalledTimes(2);
      expect(axiosMock.get).toHaveBeenNthCalledWith(1,
        'http://localhost:3001/image');
      expect(axiosMock.get).toHaveBeenNthCalledWith(2,
        'http://localhost:3001/image_redirect');
    });

    test("unordered lists rendered", async () => {
      const list = await waitForElement(
        () => { getByRole('list') });
      expect(list).toHaveTextContent('Test item 1');
      expect(list).toHaveTextContent('Test item 2');
    });
});
